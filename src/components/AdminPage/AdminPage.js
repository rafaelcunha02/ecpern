import React from 'react';

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
  const pagina = window.location.pathname + '?' + new URLSearchParams(window.location.search).toString();
  const selector = new URLSearchParams(window.location.search).get('selector');

  return (
    <div id="sideOptions">
      <h1>View</h1>
      <ul>
        <a href="admin.php?selector=1" className={pagina === 'admin.php?selector=1' ? 'active' : ''}>
          <li>User</li>
        </a>
        <a href="admin.php?selector=2" className={pagina === 'admin.php?selector=2' ? 'active' : ''}>
          <li>Orders</li>
        </a>
        <a href="admin.php?selector=3" className={selector >= 3 ? 'active' : ''}>
          <li>Caracteristics</li>
        </a>
        {selector >= 3 && (
          <>
            <a href="admin.php?selector=3" className={pagina === 'admin.php?selector=3' ? 'active' : ''}>
              <li style={{ marginLeft: '1em' }}>Category</li>
            </a>
            <a href="admin.php?selector=4" className={pagina === 'admin.php?selector=4' ? 'active' : ''}>
              <li style={{ marginLeft: '1em' }}>Size</li>
            </a>
            <a href="admin.php?selector=5" className={pagina === 'admin.php?selector=5' ? 'active' : ''}>
              <li style={{ marginLeft: '1em' }}>Condition</li>
            </a>
          </>
        )}
      </ul>
    </div>
  );
}

function UsersAdmin({ session, user, db }) {
  const users = null //User.getAll(db);

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

  return null;
}

export { AdminPage, SideMenuAdmin, UsersAdmin, OrdersAdmin };