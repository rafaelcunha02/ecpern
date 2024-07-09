import React, { useState, useEffect } from 'react';


function ProductsGridSearch({products, caracs, currentInput, currentCategory}) {
  const [cartProducts, setCartProducts] = useState([]);
  const [active, setActive] = useState([]);
  const [checked, setChecked] = useState({});
  const [countChecked, setCountChecked] = useState(0);
  const [typeToValues, setTypeToValues] = useState({});
  const [filteredTypes, setFilteredTypes] = useState({});

 

  useEffect(() => {
    const mapa = {};
    const filtered = {};
    caracs.map(carac => {
      if (!mapa[carac.caracType]) {
        mapa[carac.caracType] = [];
      }
      mapa[carac.caracType].push(carac.caracValue);
      filtered[carac.caracType] = 0;
    });
    setTypeToValues(mapa);
    setFilteredTypes(filtered);

    Object.keys(mapa).map((key, index) => {
      mapa[key].map((value, index) => {
        setChecked(prevChecked => {
          const newChecked = { ...prevChecked };
          newChecked[key + " : " + value] = false;
          return newChecked;
        });
      });
    });

    if(currentCategory){
    setChecked(prevChecked => {
      const newChecked = { ...prevChecked };
      newChecked["Categories : " + currentCategory] = true;
      return newChecked;
    });
    setCountChecked(1);
    setFilteredTypes(prevFilteredTypes => {
      const newFilteredTypes = { ...prevFilteredTypes };
      newFilteredTypes["Categories"] = 1;
      return newFilteredTypes;
    });
    }
  }, [caracs]);

  //console.log(caracs);

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


const handleCheck = (index, key) => {
  setChecked(prevChecked => {
    const newChecked = { ...prevChecked };
    newChecked[index] = !newChecked[index];
    if(newChecked[index]){
      setCountChecked(countChecked + 1);
    } else {
      setCountChecked(countChecked - 1);
    }
    setFilteredTypes(prevFilteredTypes => {
      const newFilteredTypes = { ...prevFilteredTypes };
      newFilteredTypes[key] = newFilteredTypes[key] + (newChecked[index] ? 1 : -1);
      return newFilteredTypes;
    });
    return newChecked;
  });
};

/*
useEffect(() => {
  if(currentCategory){
    let checkbox = document.getElementById("Categories : " + currentCategory);
    if (checkbox) {
      console.log("entrou");
      checkbox.checked = true;
      handleCheck(checkbox.id, "Categories");

    }
  }
}, []);
*/

  return (
    <main id="searchMain">
      <aside id="filters">
      <h1>Filters</h1>
        {Object.keys(typeToValues).map((key, index) => {
          return (
            <div className="dropdown">
              <button className={`dropdown-button ${active[index] ? "ativo" : ''}`} id="category" onClick={() => handleClick(index)}><div>{key}</div><div className="droparrow"></div></button>              
              <div className="dropdown-content" style={{display: active[index] ? "block" : "none"}}>
                {typeToValues[key].map((value, index) => {
                  return (
                    <div><input 
                          data-keyname={key} 
                          type="checkbox" 
                          checked={checked[key + " : " + value]}
                          id={key + " : " + typeToValues[key][index]} 
                          value={index} 
                          onClick={(event) => 
                            {handleCheck(event.target.id, key);
                            }}/><label htmlFor={key + index}>{value}</label></div>
                  );
                })}
              </div>
            </div>
          );
        }, [])}
      </aside>
      <section style={{marginLeft:"20em", width:"100%"}}id="productsGrid" className="gridsection">
        <h4><span className="divtitle">Search Results</span></h4>
        <div id="divfiltros" className="filtros"><span style={{display: countChecked == 0 ? "block" : "none"}}>No Filters</span>
        {Object.keys(checked).map((key, index) => {
          return (
            <div className="nomefiltro" style={{display: checked[key] ? "block" : "none"}}>{key}</div>
          );
        })}
        </div>
        <ul style={{display: "grid", gridTemplateColumns: "repeat(3,33%)"}} >
          {products.map(product => {
            //if (session.id === product.SellerID || product.isAvailable === 0) return null;

            let inCart = cartProducts.some(cartProduct => cartProduct.id === product.id);
            return (
              <li 
              style=
              {{
                display: 
                  (countChecked > 0 && 
                  (((filteredTypes["Categories"] > 0) && checked["Categories : " + product.category] == false) || 
                  ((filteredTypes["Condition"] > 0) && checked["Condition : " + product.condition] == false) || 
                  ((filteredTypes["Tamanho"] > 0) && checked["Tamanho : " + product.size] == false)) ||
                currentInput && currentInput.length > 3 && !product.name.toLowerCase().includes(currentInput.toLowerCase())
                )
                  ? "none" : "block"
              }} 
                id="productli" className="escolhido">
                <div id="productImage">
                  <img src={product.imageUrl.startsWith('http') ? product.imageUrl : `/${product.imageUrl}`} alt={product.name} />                  {/*!session.isLoggedIn*/ false ? (
                    <button className="cartButtonLp" onClick={() => window.location.href='../pages/LogIn.php'}>
                      Log In to Add to Cart
                    </button>
                  ) : (
                    <button className="cartButtonLp"
                      //data-productId={product.id}
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