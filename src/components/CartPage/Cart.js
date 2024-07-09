import React, { useState, useEffect } from 'react';

const Cart = ({ session, products }) => {
  const [isFirstProduct, setIsFirstProduct] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let totalPrice = 0;
    let productCount = 0;
    products.forEach(product => {
      totalPrice += product.price;
      productCount++;
    });
    setTotal(totalPrice);
    setCount(productCount);
    
    const fetchUser = async () => {
      const user = 1;
      setUser(user);
    };

    fetchUser();
  }, [products]);

  const showForm = (formId) => {
    document.getElementById('mbWayForm').style.display = 'none';
    document.getElementById('creditCardForm').style.display = 'none';
    document.getElementById('ATMForm').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
  };

  return (
    <div>
      <section id="cartSection" className="cartContainer">
        <div className="inlineContain">
          <div className="topFlex" id="first">
            <div>Your Cart</div>
          </div>
          <div className="overflowContainer">
            {products.map((product, index) => (
              <>
                {isFirstProduct && (
                  <div className="topFlex" id="second">
                    <div className="productHeader">PRODUCT INFORMATION</div>
                    <div className="priceHeader" id="price">PRICE</div>
                    <div id="seller">SELLER</div>
                  </div>
                )}
                <li className="topFlex" id="productlisting" key={product.id}>
                  <div className="productInfo">
                    <div id="imgproduct">
                      <img src={`../${product.imageUrl}`} alt={product.name} />
                    </div>
                    <div className="infoList">
                      <h3>
                        <a id="productHref" href={`product.php?id=${product.id}`} title={product.name}>
                          {product.name}
                        </a>
                      </h3>
                      <div>{product.category}</div>
                      <div id="removeDiv">
                        <button
                          id="remover"
                          data-price={product.price}
                          data-productid={product.id}
                          data-buyerid={user ? user.username : ''}
                          className="removeButton"
                        >
                          Remove from Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="priceInfo">{product.price}</div>
                  <div className="sellerInfo">
                    <div id="productSeller">
                      <a id="productSeller" href={`profile.php?id=${product.SellerID}`}>
                        {`${user ? `${user.firstName} ${user.lastName}` : ''}`}
                      </a>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </div>
          <button className="goBack" onClick={() => window.location.href = 'search.php'}>Browse Products</button>
        </div>

        <div className="inlineContain" id="rightSide">
          <div className="topFlex" id="first">
            <div>Summary</div>
            <div></div>
          </div>
          <div className="topFlex" id="second">
            <div>Products</div>
            <div></div>
            <div id="totalProducts">{count}</div>
          </div>
          <div className="topFlex" id="second">
            <div>Price</div>
            <div></div>
            <div id="totalPrice">${total}</div>
          </div>
          <div id="second" className="topFlex">
            <div>Shipping</div>
            <div></div>
            <div className="shippingPrice" id="shipping">$0.00</div>
          </div>
          <div className="topFlex" id="finalPrice">
            <div>FINAL PRICE</div>
            <div></div>
            <div id="finalPriceValue">${total}</div>
          </div>
          <div id="buttonDiv">
            <button data-productslength={count} id="checkoutButton">Checkout</button>
          </div>
        </div>
      </section>

      <section className="cartContainer" id="paymentSection">
        <div className="inlineContain">
          <div className="topFlex" id="first">
            <div>Payment & Shipping</div>
          </div>
          <div className="overflowContainer">
            <li className="topFlex" id="productlisting">
              <div className="paymentMethods">
                <h3>Choose a Payment Method</h3>
                <div className="radioinputs">
                  <input type="radio" id="mbWay" name="paymentMethod" value="mbWay" onClick={() => showForm('mbWayForm')} />
                  <label htmlFor="mbWay">
                    <img src="../assets/mbway.png" alt="MB WAY" id="mbwayimg" onClick={() => showForm('mbWayForm')} />
                    MB WAY
                  </label>
                  <br />
                </div>
                <form id="mbWayForm" style={{ display: 'none' }}>
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input type="text" id="phoneNumber" name="phoneNumber" defaultValue="+351" required maxLength="13" />
                  <p style={{ marginTop: '0em' }} id="atmtext">Submit your payment through the MBWAY Mobile App in the next 24 hours.</p>
                </form>

                <div className="radioinputs">
                  <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" onClick={() => showForm('creditCardForm')} />
                  <label htmlFor="creditCard">
                    Credit Card <img src="../assets/visa.webp" alt="VISA" id="visaimg" />
                    <img src="../assets/mastercard.svg" alt="mc" id="mcimg" />
                  </label>
                </div>
                <form id="creditCardForm" style={{ display: 'none' }}>
                  <label htmlFor="cardNumber">Card Number:</label>
                  <input type="text" id="cardNumber" name="cardNumber" required /><br />
                  <label htmlFor="expiryDate">Expiry Date:</label>
                  <div id="expiryDate">
                    <select id="expiryMonth" name="expiryMonth">
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(i => (
                        <option value={i} key={i}>{i}</option>
                      ))}
                    </select>
                    <select id="expiryYear" name="expiryYear">
                      <option value="">Year</option>
                      {Array.from({ length: 9 }, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option value={year} key={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <br />
                  <label htmlFor="cvv">CVV:</label>
                  <input type="text" id="cvv" name="cvv" required /><br />
                </form>

                <div className="radioinputs">
                  <input type="radio" id="ATM" name="paymentMethod" value="ATM" onClick={() => showForm('ATMForm')} />
                  <label htmlFor="ATM">
                    <img src="../assets/multibanco.png" alt="MB" id="mbimg" />
                    ATM
                  </label>
                  <br />
                </div>
                <form id="ATMForm" style={{ display: 'none' }}>
                  <p id="atmtext">Proceed to an ATM within the next 24 hours to complete your payment.</p>
                </form>
              </div>
            </li>
            <li className="topFlex" id="shippingOptions">
              <div className="shippingMethods">
                <h3>Choose a Shipping Method</h3>
                <div className="radioinputs">
                  <input type="radio" id="expressDelivery" name="shippingMethod" value="expressDelivery" />
                  <label htmlFor="expressDelivery">Express Delivery - Additional $10 per product</label>
                  <br />
                </div>
                <div className="radioinputs">
                  <input type="radio" id="standardShipping" name="shippingMethod" value="standardShipping" />
                  <label htmlFor="standardShipping">Standard Shipping - Additional $5 per product</label>
                  <br />
                </div>
                <div className="radioinputs">
                  <input type="radio" id="economyShipping" name="shippingMethod" value="economyShipping" />
                  <label htmlFor="economyShipping">Economy Shipping - Additional $2 per product</label>
                  <br />
                </div>
              </div>
            </li>
          </div>
          <button id="backToCart" className="goBack" onClick={() => window.location.href = 'cart.php'}>Go Back to the Cart</button>
        </div>

        <div className="inlineContain" id="rightSide">
          <div className="topFlex" id="first">
            <div>Summary</div>
            <div></div>
          </div>
          <div className="topFlex" id="second">
            <div>Products</div>
            <div></div>
            <div id="totalProducts" className="count2">{count}</div>
          </div>
          <div className="topFlex" id="second">
            <div>Price</div>
            <div></div>
            <div id="totalPrice" className="totalPrice">${total}</div>
          </div>
          <div id="second" className="topFlex">
            <div>Shipping</div>
            <div></div>
            <div className="shippingPrice" id="shipping">$0.00</div>
          </div>
          <div className="topFlex" id="finalPrice">
            <div>FINAL PRICE</div>
            <div></div>
            <div id="finalPriceValue" className="finalPriceValue">${total}</div>
          </div>
          <div id="buttonDiv">
            <button data-buyerid={user ? user.username : ''} id="payButton">PAY</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
