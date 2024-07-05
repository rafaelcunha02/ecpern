import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductSection = ({ session, cartProducts, products, db }) => {

  const handleAddToCart = (product) => {
    // Implement your add to cart logic here
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
          //if (product.SellerID !== session.getId()) {
            return (
              <li key={index} style={{ display: index > showCounter ? 'none' : 'block' }}>
                <div id="productImage">
                  <img src={product.imageUrl} alt={product.name} />
                  {/* {!session.isLoggedIn() ? (    
                    <button className="cartButtonLp" onClick={() => {/* Implement your redirection logic here *//*}}>
                      Log In to Add to Cart
                    </button>
                  ) : (
                    <button 
                      className="cartButtonLp"
                      data-productId={product.id}
                      data-sessionId={session.getId()}
                      data-sellerId={product.SellerID}
                      data-isAvailable={product.isAvailable}
                      disabled={cartProducts.some(cartProduct => cartProduct.id === product.id)}
                      onClick={() => handleAddToCart(product)}
                    >
                      {cartProducts.some(cartProduct => cartProduct.id === product.id) ? "Already in your Cart" : "Add to Cart"}
                    </button>
                  )} */}
                </div>
                <div id="productSeller">@<Link to={`/profile/${product.seller.username}`}>{product.seller.username}</Link></div>
                <div>
                  <div className="h3"><Link to={`/product/${product.id}`} title={product.name}>{product.name}</Link></div>
                  <p className="description">{product.productDescription}</p>
                  <p>Condition: {product.condition}</p>
                  <p className="priceInGrid">${product.price}</p>
                </div>
              </li>
            );
          //}
        })}
      </ul>
      <button id="loadMore" onClick={loadMore} style={{display: products.length < showCounter ? 'none':'block'}}>Load more products</button>
    </section>
  );
};

export default ProductSection;