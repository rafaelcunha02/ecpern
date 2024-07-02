import React, { useState, useEffect } from 'react';

function ProductsGridSearch({products}) {
  const [cartProducts, setCartProducts] = useState([]);
  const [session, setSession] = useState({});




  useEffect(() => {
    // Fetch products, cartProducts, and session data here
    // For example, using axios:
    // axios.get('/api/products').then(response => setProducts(response.data));
    // axios.get('/api/cartProducts').then(response => setCartProducts(response.data));
    // axios.get('/api/session').then(response => setSession(response.data));
  }, []);

  
  if (!Array.isArray(products)) {
    console.log('ProductsGridSearch: products is not an array:', products);
    return null; // or some fallback UI
  }

  return (
    <main id="searchMain">
      <aside id="filters">
      <h1>Filters</h1>
            <div class="dropdown">
                <button class="dropdown-button" id="category"><div>Category</div><div class="droparrow"></div></button>
                <div class="dropdown-content">
                </div>
            </div>
            <div class="dropdown">
                <button class="dropdown-button"><div>Maximum Price</div><div class="droparrow"></div></button>
                <div class="dropdown-content">
                </div>
            </div>
            <div class="dropdown">
                <button class="dropdown-button"><div>Brand</div><div class="droparrow"></div></button>
                <div class="dropdown-content">
                </div>
            </div>
            <div class="dropdown">
                <button class="dropdown-button"><div>Model</div><div class="droparrow"></div></button>
                <div class="dropdown-content">
                </div>
            </div>
            <div class="dropdown">
                <button class="dropdown-button"><div>Size</div><div class="droparrow"></div></button>
                <div class="dropdown-content">
                </div>
            </div>
            <div class="dropdown">
                <button class="dropdown-button"><div>Condition</div><div class="droparrow"></div></button>
                <div class="dropdown-content">
                </div>
            </div>
      </aside>
      <section style={{marginLeft:"20em"}}id="productsGrid" className="gridsection">
        <h4><span className="divtitle">Search Results</span></h4>
        <div id="divfiltros" className="filtros">No Filters</div>
        <ul style={{display: "grid", gridTemplateColumns: "repeat(3,33%)"}} >
          {products.map(product => {
            //if (session.id === product.SellerID || product.isAvailable === 0) return null;

            let inCart = cartProducts.some(cartProduct => cartProduct.id === product.id);
            return (
              <li id="productli" className="escolhido">
                <div id="productImage">
                  <img src={`../${product.imageUrl}`} alt={product.name} />
                  {/*!session.isLoggedIn*/ false ? (
                    <button className="cartButtonLp" onClick={() => window.location.href='../pages/LogIn.php'}>
                      Log In to Add to Cart
                    </button>
                  ) : (
                    <button className="cartButtonLp"
                      data-productId={product.id}
                      //data-sessionId={session.id}
                      //data-sellerId={product.SellerID}
                      //data-isAvailable={product.isAvailable}
                      disabled={inCart}>
                      {inCart ? "Already in your Cart" : "Add to Cart"}
                    </button>
                  )}
                </div>
                <div id="productSeller">@<a id="productSeller" href={`../pages/profile.php?username=${product.seller.username}`}>{product.seller.username}</a></div>
                <div>
                  <div className="h3"><a id="productPage" href={`../pages/product.php?id=${product.id}`} title={product.name}>{product.name}</a></div>
                  <p className="description">{product.description}</p>
                  <p>Condition: {product.condition}</p>
                  <p className="priceInGrid">${product.price}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default ProductsGridSearch;