import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {useNavigate} from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PhblQD30EyofdUR6BTc6EcNMg1yEuSOYQl8XtipyqHEZM3zqtYqo7xIm7CUrWjY2mxmpIngIOBoWXUSU3V9zWTp00qmwsXIQV');

const Cart = ({ orders, setOrders, currentUser }) => {
  const navigate = useNavigate();
  const [isFirstProduct, setIsFirstProduct] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    setScroll(true);
    if (!scroll) {
      scrollToSection1();
    }
  }, [scroll]);

  const scrollToSection2 = () => {
    if(orders.length > 0){
    sectionRef2.current?.scrollIntoView({ behavior: 'smooth' });
    }
    else{
      alert("Please add products to your cart before proceeding to checkout");
    }
  };

  const scrollToSection1 = () => {
    sectionRef1.current?.scrollIntoView({ behavior: 'smooth' });
  };

  document.body.style.overflow = 'hidden';

  useEffect(() => {
    const { totalPrice, productCount } = orders.reduce((acc, order) => {
      acc.totalPrice += parseFloat(order.Product.price);
      acc.productCount++;
      return acc;
    }, { totalPrice: 0, productCount: 0 });

    setTotal(totalPrice.toFixed(2));
    setCount(productCount);
    setUser(1);

  }, [orders]);

  useEffect(() => {
    fetch('https://vintech-ecommerce-pern.onrender.com/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: (Number(total) + Number(shippingPrice)) * 100 }), // Amount in cents
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(error => console.error('Fetch failed:', error));
  }, [total, shippingPrice]);


  const processCart = async () => {

    const data = {
      userId: currentUser.id,
      shippingMethod: shippingMethod
    };

    const response = await fetch('https://vintech-ecommerce-pern.onrender.com/api/orders/processCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const processedOrders = await response.json();
      console.log("success, processedOrders: ")
      console.log(processedOrders);
    }



  }

  const handlePay = async (event) => {
    event.preventDefault();

    if(shippingPrice != 0){

    
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user ? user.username : 'Guest',
        },
      },
    });

    setProcessing(false);

    if (error) {
      setError(error.message);
      alert(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      processCart();

      console.log('Payment succeeded!');
      alert('Payment succeeded!');
    }
  }
  else{
    alert("Please select a shipping method");
  }
  };


  const handleRemove = async (event) => {
    const orderid = event.target.getAttribute('data-orderid');

    const response = await fetch(`https://vintech-ecommerce-pern.onrender.com/api/orders/delete/${orderid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const updatedOrders = orders.filter(order => order.id !== parseInt(orderid));
      console.log(updatedOrders);
      setOrders(updatedOrders);
    } else {
      console.error('HTTP error ' + response.status);
    }
  };

  const showForm = (formId) => {
    const forms = ['mbWayForm', 'creditCardForm', 'ATMForm'];
    forms.forEach(id => document.getElementById(id).style.display = id === formId ? 'block' : 'none');
  };


  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <div>
      <section ref={sectionRef1} id="cartSection" className="cartContainer">
        <div className="inlineContain">
          <div className="topFlex" id="first">
            <div>Your Cart</div>
          </div>
          <div className="overflowContainer">
            {orders.map((order, index) => (
              <>
                {isFirstProduct && (
                  <div className="topFlex" id="second">
                    <div className="productHeader">PRODUCT INFORMATION</div>
                    <div className="priceHeader" id="price">PRICE</div>
                    <div id="seller">SELLER</div>
                  </div>
                )}
                <li className="topFlex" id="productlisting" key={order.Product.id}>
                  <div className="productInfo">
                    <div id="imgproduct">
                      <img src={order.Product.imageUrl.startsWith('http') ? order.Product.imageUrl : `../${order.Product.imageUrl}`} alt={order.Product.name} />
                    </div>
                    <div className="infoLista">
                      <h3>
                        <a id="productHref" href={`../product/${order.Product.id}`} title={order.Product.name}>
                          {order.Product.name}
                        </a>
                      </h3>
                      <div>{order.Product.category}</div>
                      <div id="removeDiv">
                        <button
                          id="remover"
                          data-price={order.Product.price}
                          data-productid={order.Product.id}
                          data-buyerid={user ? user.username : ''}
                          data-orderid={order.id}
                          className="removeButton"
                          onClick={(event) => handleRemove(event)}
                        >
                          Remove from Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="priceInfo">{order.Product.price}</div>
                  <div className="sellerInfo">
                    <div id="productSeller">
                      <a id="productSeller" href={`../profile/${order.Seller.username}`}>
                        {`${user ? `${order.Seller.firstName} ${order.Seller.lastName}` : ''}`}
                      </a>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </div>
          <button className="goBack" onClick={() => window.location.href = '../search/input'}>Browse Products</button>
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
            <div className="shippingPrice" id="shipping">${shippingPrice}</div>
          </div>
          <div className="topFlex" id="finalPrice">
            <div>FINAL PRICE</div>
            <div></div>
            <div id="finalPriceValue">${(Number(total) + Number(shippingPrice)).toFixed(2)}</div>
          </div>
          <div id="buttonDiv">
            <button  onClick={scrollToSection2} id="checkoutButton">Checkout</button>
          </div>
        </div>
      </section>

      <section ref={sectionRef2} className="cartContainer" id="paymentSection">
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
                <form className="cartForms" id="mbWayForm" style={{ display: 'none' }}>
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input type="text" id="phoneNumber" name="phoneNumber" defaultValue="+351" required maxLength="13" />
                  <p style={{ marginTop: '0em' }} id="atmtext">Submit your payment through the MBWAY Mobile App in the next 24 hours.</p>
                </form>

                <div className="radioinputs">
                  <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" onClick={() => showForm('creditCardForm')} />
                  <label htmlFor="creditCard">
                    Credit or Debit Card <img src="../assets/visa.webp" alt="VISA" id="visaimg" />
                    <img src="../assets/mastercard.svg" alt="mc" id="mcimg" />
                  </label>
                </div>
                <form id="creditCardForm" style={{ display: 'none' }}>
                  <CardElement options={cardElementOptions}/>
                </form>
                <form className="cartForms" id="ATMForm" style={{ display: 'none' }}>
                  <p id="atmtext">Proceed to an ATM within the next 24 hours to complete your payment.</p>
                </form>
              </div>
            </li>
            <li className="topFlex" id="shippingOptions">
              <div className="shippingMethods">
                <h3>Choose a Shipping Method</h3>
                <div className="radioinputs">
                  <input
                    onChange={() => {
                      setShippingMethod(10);
                      setShippingPrice(10 * orders.length);
                    }}
                    type="radio" id="expressDelivery" name="shippingMethod" value="expressDelivery" />
                  <label htmlFor="expressDelivery">Express Delivery - Additional $10 per product</label>
                  <br />
                </div>
                <div className="radioinputs">
                  <input
                    onChange={() => {
                      setShippingMethod(5);
                      setShippingPrice(5 * orders.length);
                    }}
                    type="radio" id="standardShipping" name="shippingMethod" value="standardShipping" />
                  <label htmlFor="standardShipping">Standard Shipping - Additional $5 per product</label>
                  <br />
                </div>
                <div className="radioinputs">
                  <input
                    onChange={() => {
                      setShippingMethod(2);
                      setShippingPrice(2 * orders.length);
                    }}
                    type="radio" id="economyShipping" name="shippingMethod" value="economyShipping" />
                  <label htmlFor="economyShipping">Economy Shipping - Additional $2 per product</label>
                  <br />
                </div>
              </div>
            </li>
          </div>
          <button id="backToCart" className="goBack" onClick={scrollToSection1}>Go Back to the Cart</button>
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
            <div className="shippingPrice" id="shipping">${shippingPrice}</div>
          </div>
          <div className="topFlex" id="finalPrice">
            <div>FINAL PRICE</div>
            <div></div>
            <div id="finalPriceValue" className="finalPriceValue">${(Number(total) + Number(shippingPrice)).toFixed(2)}</div>
          </div>
          <div id="buttonDiv">
            <button onClick={handlePay} data-buyerid={user ? user.username : ''} id="payButton" disabled={!stripe || processing}>
              {processing ? 'Processing...' : 'PAY'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const CartWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <Cart {...props} />
  </Elements>
);

export default CartWrapper;
