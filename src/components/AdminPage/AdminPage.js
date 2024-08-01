import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {UserContext} from '../../App';


function AdminPage() {
  return (
    <section className="adminContainer">
      <div className="adminTitle">Admin Page</div>
      <div className="adminOptions">
        <div className="adminOption" id="addCategory">
          <a href="addCategory.php">Category</a>
        </div>
        <div className="adminOption" id="addUser">
          <a href="addUser.php">User</a>
        </div>
        <div className="adminOption" id="viewOrders">
          <a href="viewOrders.php">Orders</a>
        </div>
      </div>
    </section>
  );
}

function SideMenuAdmin({ selector, setSelector }) {
  const location = useLocation();
  const { pathname } = location;
  
  return (
      <div id="sideOptions">
        <h1>View</h1>
        <ul>
          <div onClick={() => setSelector(0)} className={selector === 0 ? 'active' : ''}>
            <li>User</li>
          </div>
          <div onClick={() => setSelector(1)} className={selector === 1 ? 'active' : ''}>
            <li>Orders</li>
          </div>
        </ul>
      </div>
    );
}

function UsersAdmin({ session, user, db }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`https://vintech-ecommerce-pern.onrender.com/api/users`);
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }
  , []);
  
  const rankUser = async (event, id) => {
    event.preventDefault();

    const response = await fetch(`https://vintech-ecommerce-pern.onrender.com/api/users/rankUp/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rank: 1 })
    });
    const data = await response.json();
    setUsers(users.map((user) => user.id === id ? { ...user, rank: 1 } : user));
  }

  return (
    <div className="adminContainer">
      <div className="Container">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <div className="info">
              <div className="row">
                <div className="userID">ID: {user.id}</div>
                <div className="username">Username: {user.username}</div>
              </div>
              <div className="row">
                <div className="email">Email: {user.email}</div>
                <div className="rank">Rank: {user.rank === 0 ? 'usuário' : 'admin'}</div>
              </div>
            </div>
            <div className="actions">
              <div className="lock">
                <button className="lockButton" onClick={() => window.location.href = `../profile/${user.username}`}>Check Profile</button>
              </div>
              <div className="rank">
                {user.rank === 0 && (
                  <form onSubmit={(e) => rankUser(e, user.id)} method="post">
                    <input type="hidden" name="username" value={user.username} />
                    <button className="rankUpButton" type="submit">Promote to Admin</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersAdmin(currentUser) {
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


  

  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
        console.log("current user: ")
        console.log(currentUser);
      const fetchProducts = async () => {
          try {
              const res = await fetch('https://vintech-ecommerce-pern.onrender.com/api/orders/buys');
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
  }, []);




  if (loading || !loggedUser || !currentUser) return null;
  if (error) return <div>{error}</div>;

const sortedGroupedOrders = Object.entries(groupedProducts).sort(([a], [b]) => b - a);
  
console.log("grouped orders:");
console.log(sortedGroupedOrders);


  return (
		<div>
		<section id="orderHistory" className="orderHistoryContainer">
			<div className="inlineContain">
				<div className="topFlex" id="first" style={{fontSize:"1em"}}>
					<h1>Order History</h1>
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
										const order = index
										const buyer = index.Buyer;
                    const seller = index.Seller;

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
                              <div>
															<div id="productBuyer">
																Bought by
																<a id="productBuyer" href={`profile/${buyer?.username}`}> 
																	 {buyer ? ` ${buyer.firstName} ${buyer.lastName}` : ' Deleted User'}
																</a>
															</div>
                              <div style={{marginTop: '0.5em'}} id="productBuyer">
																Sold by
																<a id="productBuyer" href={`profile/${seller?.username}`}> 
																	 {seller ? ` ${seller.firstName} ${seller.lastName}` : ' Deleted User'}
																</a>
															</div>
                              <p>Shipping company: {index.shipping === 2 ? 'Economy Shipping' 
                                : index.shipping === 5 ? 'Standard Shipping' 
                                : index.shipping === 10 ? 'Express Delivery' 
                                : ''}</p>
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
											<p>Total Products Involved: {totalProducts}</p>
											<p>Total Money Involved: ${totalAmount.toFixed(2)}</p>
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
									const buyer = index.Buyer;

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

export { AdminPage, SideMenuAdmin, UsersAdmin, OrdersAdmin };