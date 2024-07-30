import React from 'react';
import {useState, useEffect} from 'react';
import {UserContext} from '../../App';

const Orders = () => {

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
            fetchData(`http://localhost:4005/api/users/id/${loggedUser.id}`, setCurrentUser);
        }
    }, [loggedUser]);
    

    const [groupedProducts, setGroupedProducts] = useState({});

    useEffect(() => {
        if(currentUser){
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:4005/api/orders/buys/' + currentUser.id);
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


	const handlePrintShippingForm = (groupNumber) => {
		// Implement print functionality
		console.log(`Print shipping form for group ${groupNumber}`);
	};

    if (loading || !loggedUser || !currentUser) return null;
    if (error) return <div>{error}</div>;

	const sortedGroupedProducts = Object.entries(groupedProducts).sort(([a], [b]) => b - a);



	return (
		<section id="orderHistory" className="orderHistoryContainer">
			<div className="inlineContain">
				<div className="topFlex" id="first">
					<h1>Sales History</h1>
				</div>
				<div className="overflowContainer">
					<div className="productGroup">
						{sortedGroupedProducts.map(([groupNumber, productsInGroup]) => {
							let totalProducts = 0;
							let totalAmount = 0;

							return (
								<div className="listingWithTitle" key={groupNumber}>
									<div className="orderDiv">Order {groupNumber}:</div>
									{productsInGroup.map((product) => {
										totalProducts++;
										totalAmount += product.price;
										const order = true
										const buyer = product.Buyer

										return (
											<li className="productList" key={product.id}>
												<div className="productInfo">
													<div id="imgproduct">
														<img src={`../${product.imageUrl}`} alt={product.name} />
													</div>
													<div className="infoList">
														<div>{product.name}</div>
														<div>{product.category}</div>
														<div className="priceInfo">${product.price}</div>
														{order && (
															<div id="productBuyer">
																Bought by
																<a id="productBuyer" href={`profile.php?id=${buyer?.username}`}>
																	{buyer ? `${buyer.firstName} ${buyer.lastName}` : 'Deleted User'}
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
										<button className="printForm" onClick={() => handlePrintShippingForm(groupNumber)}>
											Print Shipping Form
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{sortedGroupedProducts.map(([groupNumber, productsInGroup]) => {
				let totalAmount = 0;

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
								{productsInGroup.map((product) => {
									totalAmount += product.price;
									const order = true
									const buyer = product.Buyer

									return (
										<tr key={product.id}>
											<td>{product.name}</td>
											<td>${product.price}</td>
											<td>{buyer ? `${buyer.firstName} ${buyer.lastName}` : 'Deleted User'}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<p>Total Amount Earned: ${totalAmount}</p>
					</div>
				);
			})}
		</section>
	);
};

export default Orders;