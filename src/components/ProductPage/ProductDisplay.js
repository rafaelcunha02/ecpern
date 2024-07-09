import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './productPage.css';
import '../../common.css';


const ProductDisplay = ({ user }) => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [nextProductId, setNextProductId] = useState(null);
  const [prevProductId, setPrevProductId] = useState(null);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);

    

  useEffect(() => {
    fetch('http://localhost:4005/api/products/' + id)
    .then(res => {
        if (!res.ok) {
        throw new Error('HTTP error ' + res.status);
    }
        return res.json();
    })
    .then(data => {
        setProduct(data);
    })
    .catch(error => {
        console.error('Fetch failed:', error);
    });
  }, [id]);



  useEffect(() => {
    if (product) {
      fetch('http://localhost:4005/api/users/id/' + product.sellerId)
      .then(res => {
          if (!res.ok) {
          throw new Error('HTTP error ' + res.status);
      }
          return res.json();
      })
      .then(data => {
          setSeller(data);
      })
      .catch(error => {
          console.error('Fetch failed:', error);
      });
    }
  }, [id, product]);

useEffect(() => {
    if (product) {
        Promise.all([
        fetch('http://localhost:4005/api/products/' + product.id + '/next'),
        fetch('http://localhost:4005/api/products/' + product.id + '/previous')
        ])
        .then(([res1, res2]) => {
            if (!res1.ok || !res2.ok) {
            throw new Error('HTTP error ' + res1.status + ' ' + res2.status);
            }
            return Promise.all([res1.json(), res2.json()]);
        })
        .then(([data1, data2]) => {
            setNextProductId(data1 ? data1.id : null);
            setPrevProductId(data2 ? data2.id : null);
        })
        .catch(error => {
            console.error('Fetch failed:', error);
        });
    }
}, [id, product]);

    console.log("product ids: ", prevProductId, nextProductId);
    console.log(product);

  useEffect(() => {
    // Fetch product, seller, nextProductId, prevProductId, and inCart status here
    // and update the state variables using the set functions
  }, [id]);

  if (!product || !seller) {
    return <div>Loading...</div>;
  }

  const handleBuy = () => {
    // Add your logic for buying the product here
  };

  const handleAddToCart = () => {
    // Add your logic for adding the product to the cart here
  };

  const handleEditProduct = () => {
    navigate(`/edit/${product.id}`);
  };

  const handleUnlistProduct = async () => {
    if(!confirmDelete){
      setConfirmDelete(true);
      return
    }
    
    const data = {
      id: product.id
    }
    console.log(data);

    const response = await fetch('../api/products/delete',
      { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      }
    )

    if(response.ok){
      navigate('/');
    }
    else{
      console.error('Error:', response);
    }

  };

  return (
    <span>
    <div id="containerProduct">
      {prevProductId && (
        <button
          className="nextProduct"
          id="back"
          onClick={() => navigate(`/product/${prevProductId}`)}
        />
      )}
      <section id="s1">
        <div>
          <img src={product.imageUrl.startsWith("http") ? product.imageUrl : `/${product.imageUrl}`} id="imagemproduto" alt={product.name} />
        </div>
        <div id="information">
          <div id="info">
            <h3 id="name">{product.name}</h3>
            <h3 id="price">${product.price}</h3>
            <p id="category">Category: {product.category}</p>
            <p id="brand">Brand: {product.brand}</p>
            <p id="model">Model: {product.model}</p>
            <p id="size">Size: {product.tamanho}</p>
            <p id="condition">Condition: {product.condition}</p>
            <p id="seller">Seller: {seller.firstName} {seller.lastName}</p>

            <div id="buttons">
              {!user || (user.id !== product.sellerId) ? (
                <>
                  <button id="buy" onClick={!user ? () => navigate('/LogIn') : handleBuy}>Buy</button>
                  {!user ? (
                    <button id="toLogin" onClick={() => navigate('/LogIn')}>
                      Log In to Add to Cart
                    </button>
                  ) : (
                    <button id="cart" onClick={handleAddToCart} disabled={inCart}>
                      {inCart ? "Already in your Cart" : "Add to Cart"}
                    </button>
                  )}
                  <div id="sharedm">
                    <button id="DM">Send Message</button>
                    <button id="share">Share</button>
                  </div>
                </>
              ) : (
                <>
                  <button id="Edit" onClick={handleEditProduct}>Edit Product</button>
                  <button id="Unlist" onClick={handleUnlistProduct}>{confirmDelete ? "Click Again to Confirm" : "Unlist Product"}</button>
                  <div id="sharedm"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {nextProductId && (
        <button
          className="nextProduct"
          id="next"
          onClick={() => navigate(`/product/${nextProductId}`)}
        />
      )}
      </div>
      <div style={{marginTop: '21em'}}
      >
      <h1>Product description</h1>
      <p style={{ marginBottom: '5em' }} id="desc">
        {product.productDescription}
      </p>
        </div>
    </span>
  );
};

export default ProductDisplay;