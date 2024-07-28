import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
          <Link to={`/admin/caracteristics`} className={selector >= 3 ? 'active' : ''}>
            <li>Caracteristics</li>
          </Link>
          {selector >= 3 && (
            <>
              <Link to={`/admin/caracteristics`} className={pathname === 'admin/caracteristics' ? 'active' : ''}>
                <li style={{ marginLeft: '1em' }}>Category</li>
              </Link>
              <Link to={`/admin.php?selector=4`} className={pathname === 'admin.php?selector=4' ? 'active' : ''}>
                <li style={{ marginLeft: '1em' }}>Size</li>
              </Link>
              <Link to={`/admin.php?selector=5`} className={pathname === 'admin.php?selector=5' ? 'active' : ''}>
                <li style={{ marginLeft: '1em' }}>Condition</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    );
}

function UsersAdmin({ session, user, db }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`http://localhost:4005/api/users`);
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }
  , []);
  
  const rankUser = async (event, id) => {
    event.preventDefault();
    
    const response = await fetch(`http://localhost:4005/api/users/rankUp/${id}`, {
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

function OrdersAdmin({ session, user, db }) {
  //const products = Order.getProcessedOrders(db);
  //const groupedProducts = Order.mapProductsToOrderGroups(db, products);
  const admin = true;
  const text = "";

  //drawOrderHistory(db, session, products, groupedProducts, admin);

  return(
    <div><h1>ORDERS ADMIN</h1></div>
  );
}

export { AdminPage, SideMenuAdmin, UsersAdmin, OrdersAdmin };