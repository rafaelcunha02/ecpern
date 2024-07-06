import React, { useState, useEffect } from 'react';

function ProductsGridSearch({products, caracs}) {
  const [cartProducts, setCartProducts] = useState([]);
  const [session, setSession] = useState({});
  const [active, setActive] = useState([]);
  const [checked, setChecked] = useState({});
  const [typeToValues, setTypeToValues] = useState({});

  useEffect(() => {
    const mapa = {};
    const arr = [];
    caracs.map(carac => {
      if (!mapa[carac.caracType]) {
        mapa[carac.caracType] = [];
      }
      mapa[carac.caracType].push(carac.caracValue);
    });
    setTypeToValues(mapa);
    console.log("mapa: " + typeToValues["Categories"]);

  }, [caracs]);

  //DROPDOWNS
  useEffect(() => {
    setActive(new Array(6).fill(false)); // Assuming you have 6 dropdowns/caracTypes
  }, []);

  const handleClick = index => {
    setActive(prevActive => {
      const newActive = [...prevActive];
      newActive[index] = !newActive[index];
      return newActive;
    });
  };


  const handleCheck = index => {
    setChecked(prevChecked => {
      const newChecked = { ...prevChecked };
      newChecked[index] = !newChecked[index];
      console.log(newChecked);
      return newChecked;
    });
  };


  return (
    <main id="searchMain">
      <aside id="filters">
      <h1>Filters</h1>
        {Object.keys(typeToValues).map((key, index) => {
          return (
            <div class="dropdown">
              <button className={`dropdown-button ${active[index] ? "ativo" : ''}`} id="category" onClick={() => handleClick(index)}><div>{key}</div><div class="droparrow"></div></button>              
              <div class="dropdown-content" style={{display: active[index] ? "block" : "none"}}>
                {typeToValues[key].map((value, index) => {
                  return (
                    <div><input data-keyname={key} type="checkbox" id={key + index} value={index} onClick={()=>handleCheck(key + typeToValues[key][index])}/><label for={key + index}>{value}</label></div>
                  );
                })}
              </div>
            </div>
          );
        }, [])}
            <div class="dropdown">
              <button className={`dropdown-button ${active[0] ? "ativo" : ''}`} id="category" onClick={() => handleClick(0)}><div>Category</div><div class="droparrow"></div></button>              
              <div class="dropdown-content" style={{display: active[0] ? "block" : "none"}}>
                <div><input type="checkbox" id="category1" value="1" onClick={()=>handleCheck("CategorySmartphone")}/><label for="category1">Electronics</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
              </div>
            </div>
            <div class="dropdown">
              <button className={`dropdown-button ${active[1] ? "ativo" : ''}`} id="category" onClick={() => handleClick(1)}><div>Category</div><div class="droparrow"></div></button>              
              <div class="dropdown-content" style={{display: active[1] ? "block" : "none"}}>
                <div><input type="checkbox" id="category1" value="1" /><label for="category1">Electronics</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>

              </div>
            </div>
            <div class="dropdown">
              <button className={`dropdown-button ${active[2] ? "ativo" : ''}`} id="category" onClick={() => handleClick(2)}><div>Category</div><div class="droparrow"></div></button>              
              <div class="dropdown-content" style={{display: active[2] ? "block" : "none"}}>
                <div><input type="checkbox" id="category1" value="1" /><label for="category1">Electronics</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
              </div>
            </div>
            <div class="dropdown">
              <button className={`dropdown-button ${active[3] ? "ativo" : ''}`} id="category" onClick={() => handleClick(3)}><div>Category</div><div class="droparrow"></div></button>              
              <div class="dropdown-content" style={{display: active[3] ? "block" : "none"}}>
                <div><input type="checkbox" id="category1" value="1" /><label for="category1">Electronics</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
              </div>
            </div>
            <div class="dropdown">
              <button className={`dropdown-button ${active[4] ? "ativo" : ''}`} id="category" onClick={() => handleClick(4)}><div>Category</div><div class="droparrow"></div></button>              
              <div class="dropdown-content" style={{display: active[4] ? "block" : "none"}}>
                <div><input type="checkbox" id="category1" value="1" /><label for="category1">Electronics</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
              </div>
            </div>
            <div class="dropdown">
              <button className={`dropdown-button ${active[5] ? "ativo" : ''}`} id="category" onClick={() => handleClick(5)}><div>Category</div><div class="droparrow"></div></button>              
              <div class="dropdown-content" style={{display: active[5] ? "block" : "none"}}>
                <div><input type="checkbox" id="category1" value="1" /><label for="category1">Electronics</label></div>
                <div><input type="checkbox" id="category2" value="2" /><label for="category2">Clothing</label></div>
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
                  <p className="description">{product.productDescription}</p>
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