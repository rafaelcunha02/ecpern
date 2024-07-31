import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductSection = ({ currentUser, cartProducts, products}) => {
  
  console.log(cartProducts);
  console.log(cartProducts[0]);
  
  const handleAddToCart = async (event, product) => {

    const Data = {
      productId: product.id,
      buyerId: currentUser.id,
      sellerId: product.sellerId,
    };
    fetch('https://vintech-ecommerce-pern.onrender.com/api/orders/create', {
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

  const [showCounter, setShowCounter] = useState(10);

  const loadMore = () => {
    setShowCounter(showCounter + 5);
  };

return (
  <section id="productsGrid">
    <h2><div>Products</div></h2>

    <ul>
      {products.map((product, index) => {
        if (!currentUser || product.sellerId !== currentUser.id) {
          return (
            <li key={index} style={{ display: index > showCounter ? 'none' : 'block' }}>
              <div className="productImage">
                <img src={product.imageUrl} alt={product.name} />
                {!currentUser ? (    
                  <button className="cartButtonLp" onClick={() => { /*Implement your redirection logic here*/}}>
                    Log In to Add to Cart
                  </button>
                ) : (
                  <button 
                    className="cartButtonLp"
                    data-productId={product.id}
                    //data-sessionId={session.getId()}
                    data-sellerId={product.sellerId}
                    data-isAvailable={product.isAvailable}
                    //disabled={cartProducts.some(cartProduct => cartProduct.id === product.id)}
                    onClick={(event) => handleAddToCart(event, product)}
                  >
                    {cartProducts.some(cartProduct => cartProduct.productId == product.id) ? "Already in your Cart" : "Add to Cart"}
                  </button>
                )}
              </div>
              <div className="productSeller">@<Link to={`/profile/${product.seller.username}`}>{product.seller.username}</Link></div>
              <div>
                <div className="h3"><Link to={`/product/${product.id}`} title={product.name}>{product.name}</Link></div>
                <p className="description">{product.productDescription}</p>
                <p>Condition: {product.condition}</p>
                <p className="priceInGrid">${product.price}</p>
              </div>
            </li>
          );
        } else {
          return null; // or some fallback UI
        }
      })}
    </ul>
    <button id="loadMore" onClick={loadMore} style={{display: products.length <= showCounter ? 'none':'block'}}>Load more products</button>
  </section>
);
};

export default ProductSection;