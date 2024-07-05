import React from 'react';
import { Link } from 'react-router-dom';

function UserProducts({user, currentUser, sellingProducts, cartProducts }) {
  return (
    <section id="productsGrid">
      {sellingProducts.length === 0 ? (
        <h2></h2>
      ) : (
        <>
          <h2>
            {currentUser === user
              ? 'Your Listed Products'
              : 'Products from this user'}
          </h2>
          <ul>
            {sellingProducts.map((product) => {
              if (product.isAvailable === 1) {
                const inCart = cartProducts.some(
                  (cartProduct) => cartProduct === product
                );

                return (
                  <li key={product}>
                    <div id="productImage">
                      <img src={`../${product.imageUrl}`} alt={product.name} />
                      {product.sellerId !== (currentUser && currentUser.id) && (
                        <>
                          {!currentUser ? (
                            <button
                              className="cartButtonLp"
                              onClick={() =>
                                (window.location.href = '/LogIn')
                              }
                            >
                              Log In to Add to Cart
                            </button>
                          ) : (
                            currentUser === user && (
                              <button
                                className="cartButtonLp"
                                data-productId={product.id}
                                data-userId={currentUser.id}
                                data-sellerId={product.sellerID}
                                data-isAvailable={product.isAvailable}
                                disabled={inCart}
                              >
                                {inCart ? 'Already in your Cart' : 'Add to Cart'}
                              </button>
                            )
                          )}
                        </>
                      )}
                    </div>
                    <div>
                      <h3>
                        <Link
                          to={`/product/${product.id}`}
                          title={product.name}
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <p>{product.description}</p>
                      <p>{product.price}</p>
                      <p id="productSeller">
                        @
                        <Link
                          to={`/profile/${product.seller.username}`}
                        >
                          {product.seller.username}
                        </Link>
                      </p>
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </>
      )}
    </section>
  );
}

export default UserProducts;