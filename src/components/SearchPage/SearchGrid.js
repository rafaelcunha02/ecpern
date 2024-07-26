import React, { useState, useEffect } from 'react';


function ProductsGridSearch({products, caracs, currentInput, currentCategory, cartProducts, currentUser}) {
  const [active, setActive] = useState([]);
  const [checked, setChecked] = useState({});
  const [countChecked, setCountChecked] = useState(0);
  const [typeToValues, setTypeToValues] = useState({});
  const [filteredTypes, setFilteredTypes] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999999);

  const handleAddToCart = async (event, product) => {

    const Data = {
      productId: product.id,
      buyerId: currentUser.id,
      sellerId: product.sellerId,
    };
    fetch('http://localhost:4005/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        let button = event.target;
        button.innerHTML = "Added to Cart";
        button.disabled = true;
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };


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

    if(key.startsWith("Price")){
      handlePriceCheck(newChecked);
    }

    return newChecked;
  });
};

const unCheckOtherPrices = (index) => {
  setChecked(prevChecked => {
    const newChecked = { ...prevChecked };
    Object.keys(newChecked).forEach((key) => {
      if (key.startsWith("Price") && key !== index) {
        newChecked[key] = false;
      }
    });
    return newChecked;
  });
};

const handlePriceCheck = (checks) => {
  const minimo = 0;
  const maximo = 9999999;

  let min = maximo;
  let max = minimo;

  console.log(checks);
  Object.keys(checks).forEach((key) => {
    if (key.startsWith("Price") && checks[key]) {
      let values = key.split(" : ")[1].split("-");
      let currentMin = parseInt(values[0], 10);
      let currentMax = parseInt(values[1], 10);

      if (currentMin < min) {
        min = currentMin;
      }
      if (currentMax > max) {
        max = currentMax;
      }
    }
  });

  if (min < minimo) {
    min = minimo;
  }
  if (max > maximo) {
    max = maximo;
  }

  setMinPrice(min);
  setMaxPrice(max);
};


useEffect(() => {
  console.log('Min Price:', minPrice);
  console.log('Max Price:', maxPrice);
}, [minPrice, maxPrice]);

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
                })
                }
              </div>
            </div>
          );
        }, [])}
        <div className="dropdown">
          <button className={`dropdown-button ${active[(Object.keys(typeToValues).length + 1)] ? "ativo" : ''}`}
            id="category" onClick={() => handleClick((Object.keys(typeToValues).length + 1))}><div>Price</div><div className="droparrow"></div></button>
          <div className="dropdown-content" style={{display: active[(Object.keys(typeToValues).length + 1)] ? "block" : "none"}}>
          <div>
            <label htmlFor="minPrice"></label>
            <input placeholder="Minimum Price" type="number" id="minPrice" name="minPrice" onChange={(event) => setMinPrice(Number(event.target.value))} />
          </div>
          <div>
            <label htmlFor="maxPrice"></label>
            <input 
              placeholder="Maximum Price" 
              type="number" 
              id="maxPrice" 
              name="maxPrice" 
              onChange={(event) => {
                if (event.target.value !== "") {
                  setMaxPrice(Number(event.target.value));
                } else {
                  setMaxPrice(9999999);
                }
              }} 
            />
          </div>
          </div>
        </div>
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

            let inCart = cartProducts.some(cartProduct => cartProduct.productId === product.id);
            return (
              <li 
              style=
              {{
                display: 
                  ((countChecked > 0 && 
                  (((filteredTypes["Categories"] > 0) && checked["Categories : " + product.category] == false) || 
                  ((filteredTypes["Condition"] > 0) && checked["Condition : " + product.condition] == false) || 
                  ((filteredTypes["Size"] > 0) && checked["Size : " + product.size] == false) ||
                  ((filteredTypes["Brand"] > 0) && checked["Brand : " + product.brand] == false)) ||
                currentInput && currentInput.length > 3 && !product.name.toLowerCase().includes(currentInput.toLowerCase())
                ) || (product.price < minPrice || product.price > maxPrice))
                  ? "none" : "block"
              }} 
                id="productli" className="escolhido">
                <div id="productImage">
                  <img src={product.imageUrl.startsWith('http') ? product.imageUrl : `/${product.imageUrl}`} alt={product.name} /> 
                  {!currentUser ? (
                    <button className="cartButtonLp"
                    style={{top: "50%"}}
                    onClick={() => window.location.href='../../LogIn'}>
                      Log In to Add to Cart
                    </button>
                  ) : (
                    <button className="cartButtonLp"
                    onClick={(e) => handleAddToCart(e, product)}
                    style={{top: "50%"}}
                      //data-productId={product.id}
                      //data-sessionId={session.id}
                      //data-sellerId={product.SellerID}
                      //data-isAvailable={product.isAvailable}
                      disabled={inCart}>
                      {inCart ? "Already in your Cart" : "Add to Cart"}
                    </button>
                  )}
                </div>
                <div id="productSeller">@<a id="productSeller" href={`../../profile/${product.seller.username}`}>{product.seller.username}</a></div>
                <div>
                  <div className="h3"><a id="productPage" href={`../../product/${product.id}`} title={product.name}>{product.name}</a></div>
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