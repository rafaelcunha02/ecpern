import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../common.css';

const ProductSection = ({ session, cartProducts, products, db }) => {

    const [users, setUsers] = useState({});

    useEffect(() => {
      console.log("entered useEffect");
        const fetchUsers = async () => {
            const newUsersList = {};
            for (const product of products) {
                    const response = await fetch(`http://localhost:4005/api/users/id/${product.sellerId}`);                if (response.ok) {
                    const userData = await response.json();
                    console.log("userData: ", userData);
                    newUsersList[product.sellerId] = userData;
                } else {
                    console.error(`Failed to fetch user with ID ${product.SellerID}`);
                }
            }
            setUsers(newUsersList);
        };
        fetchUsers();
    }, [products]);

    console.log("users: ", users);

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
                {console.log("vendedor: ", product.sellerId)}
                {console.log("nome do vendedor: ", users[product.sellerId]?.Username)}
                <div id="productSeller">@<Link to={`/profile/${users[product.sellerId]?.id}`}>{users[product.sellerId]?.username}</Link></div>
                <div>
                  {console.log("nome do produto", product.name)}
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