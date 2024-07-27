import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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

function SideMenuAdmin({ session, db }) {
  const location = useLocation();
  const { pathname } = location;
  const selector = 1;


  return (
      <div id="sideOptions">
        <h1>View</h1>
        <ul>
          <Link to={`/admin`} className={pathname === `/admin` ? 'active' : ''}>
            <li>User</li>
          </Link>
          <Link to={`/admin/orders`} className={pathname === 'admin/orders' ? 'active' : ''}>
            <li>Orders</li>
          </Link>
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
  const users = [1,2,3] //User.getAll(db);

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
                <button className="lockButton" onClick={() => window.location.href = `../pages/profile.php?username=${user.username}`}>Check Profile</button>
              </div>
              <div className="rank">
                {user.rank === 0 && (
                  <form action="../actions/action_rankUser.php" method="post">
                    <input type="hidden" name="csrf" value={session.getCsrf()} />
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

  console.log("ORDERS ADMIN BRO");
  return(
    <div><h1>ORDERS ADMIN</h1></div>
  );
}

export { AdminPage, SideMenuAdmin, UsersAdmin, OrdersAdmin };