import React from 'react';
import {useState, useEffect} from 'react';
import {UserContext} from '../../App';

const Sales = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

	

    const loggedUser = React.useContext(UserContext);

    const fetchData = async (url, setter) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('HTTP error ' + res.status);
            const data = await res.json();
            setter(data);
        } catch (error) {
            console.error('Fetch failed:', error);
            setError('Failed to fetch data');
        }
    };

    useEffect(() => {
        if (loggedUser) {
            fetchData(`https://vintech-ecommerce-pern.onrender.com/api/users/id/${loggedUser.id}`, setCurrentUser);
        }
    }, [loggedUser]);
    

    const [groupedProducts, setGroupedProducts] = useState({});

    useEffect(() => {
        if(currentUser){
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://vintech-ecommerce-pern.onrender.com/api/orders/sales/' + currentUser.id);
                if (!res.ok) throw new Error('HTTP error ' + res.status);
                const data = await res.json();
                const groupedProducts = data.reduce((acc, product) => {
                    if (!acc[product.orderGroup]) {
                        acc[product.orderGroup] = [];
                    }
                    acc[product.orderGroup].push(product);
                    return acc;
                }, {});
                setGroupedProducts(groupedProducts);
            } catch (error) {
                console.error('Fetch failed:', error);
            }
        };
        fetchProducts();
        setLoading(false);
    }
    }, [currentUser]);


	function handlePrintShippingForm(groupNumber) {
		let shippingForm = document.getElementById("shippingForm" + groupNumber);
		console.log(shippingForm);
		let header = document.getElementById("fixedHeader");
		header.style.display = 'none';
		let sideOpt = document.getElementById("sideOptions");
		sideOpt.style.display = 'none';
		let container = document.getElementById("orderHistory");
		container.style.display = 'none';
		let footer = document.getElementById("footer");
		footer.style.display = 'none';
	
		shippingForm.style.display = 'block';
		shippingForm.classList.add('print');
		window.print();
	
		shippingForm.style.display = 'none';
		header.style.display = 'block';
		header.style.position = 'fixed';
		header.style.removeProperty('display');
		sideOpt.style.display = 'block';
		container.style.display = 'block';
	}

    if (loading || !loggedUser || !currentUser) return null;
    if (error) return <div>{error}</div>;

	const sortedGroupedOrders = Object.entries(groupedProducts).sort(([a], [b]) => b - a);

	console.log(sortedGroupedOrders);

	return (
		<div>
		<section id="orderHistory" className="orderHistoryContainer">
			<div className="inlineContain">
				<div className="topFlex" id="first" style={{fontSize:"1em"}}>
					<h1>Sales History</h1>
				</div>
				<div className="overflowContainer" style={{maxHeight:"70vh"}}>
					<div className="productGroup">
						{sortedGroupedOrders.map(([groupNumber, ordersInGroup]) => {
							let totalProducts = Number(0);
							let totalAmount = Number(0);

							return (
								<div className="listingWithTitle" key={groupNumber}>
									<div className="orderDiv">Order {groupNumber}:</div>
									{ordersInGroup.map((index) => {
										totalProducts++;
										totalAmount += Number(index.Product.price);
										const order = index;
										const buyer = index.Buyer;

										return (
											<li className="productList" key={index.id}>
												<div className="productInfo">
													<div id="imgproduct">
														<img src={index.Product.imageUrl.startsWith("http") ? index.Product.imageUrl : `../${index.Product.imageUrl}`} alt={index.Product.name} />
													</div>
													<div className="infoList">
														<div>{index.Product.name}</div>
														<div>{index.Product.category}</div>
														<div className="priceInfo">${index.Product.price}</div>
														{order && (
															<div id="productBuyer">
																Bought by
																<a id="productBuyer" href={`profile/${buyer?.username}`}> 
																	 {buyer ? ` ${buyer.firstName} ${buyer.lastName}` : ' Deleted User'}
																</a>
															</div>
														)}
													</div>
												</div>
											</li>
										);
									})}
									<div className="orderFlex">
										<div className="orderSummary">
											<h3>Order Summary:</h3>
											<p>Products Sold: {totalProducts}</p>
											<p>Money Earned: ${totalAmount}</p>
										</div>

									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
			{sortedGroupedOrders.map(([groupNumber, ordersInGroup]) => {
				let totalAmount = Number(0);

				return (
					<div id={`shippingForm${groupNumber}`} style={{ display: 'none' }} key={`shippingForm${groupNumber}`}>
						<h3>Shipping Form</h3>
						<h3>Order {groupNumber}:</h3>
						<div className="watermark">Vintech</div>
						<table>
							<thead>
								<tr>
									<th>Product</th>
									<th>Price</th>
									<th>Buyer</th>
								</tr>
							</thead>
							<tbody>
								{ordersInGroup.map((index) => {
									totalAmount += Number(index.Product.price);
									const order = index;
									const buyer = currentUser;

									return (
										<tr key={index.Product.id}>
											<td>{index.Product.name}</td>
											<td>${index.Product.price}</td>
											<td>{buyer ? `${buyer.firstName} ${buyer.lastName}` : 'Deleted User'}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<p>Total Amount Spent: ${totalAmount.toFixed(2)}</p>
						<p>Shipping company: {ordersInGroup[0].shipping === 2 ? 'Economy Shipping' 
											: ordersInGroup[0].shipping === 5 ? 'Standard Shipping' 
											: ordersInGroup[0].shipping === 10 ? 'Express Delivery' 
											: ''}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Sales;