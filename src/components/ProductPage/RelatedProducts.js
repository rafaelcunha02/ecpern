import React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './productPage.css';

function RelatedProducts({ user }) {


    const { id } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://vintech-ecommerce-pern.onrender.com/api/products/${id}`)
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
            }
            );
    }, [id]);


    useEffect(() => {
        if(product){
            fetch(`https://vintech-ecommerce-pern.onrender.com/api/products/category/${product.category}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP error ' + res.status);
                }
                return res.json();
            })
            .then(data => {
                setCategoryProducts(data);
            })
            .catch(error => {
                console.error('Fetch failed:', error);
            });
        }
    }, [product]);


    return (
        <section id="productsGrid">
            <h2>Related Products</h2>
            <ul>
                {categoryProducts.map(relatedProduct => {
                    if (relatedProduct.id !== product.id && relatedProduct.isAvailable === 1 && (user && user.id !== relatedProduct.sellerId)) {
                        return (
                            <li key={relatedProduct.id}>
                                <div id="productImage">
                                    <img
                                        src={relatedProduct.imageUrl.startsWith("http") ? relatedProduct.imageUrl : `../${relatedProduct.imageUrl}`}
                                        alt={relatedProduct.name}
                                    />
                                </div>
                                <div>
                                    <h3>
                                        <Link id="productPage" to={`/product/${relatedProduct.id}`} title={relatedProduct.name}>
                                            {relatedProduct.name}
                                        </Link>
                                    </h3>
                                    <p>{relatedProduct.description}</p>
                                    <p>${relatedProduct.price}</p>
                                    <p id="productSeller">
                                        @
                                        <Link id="productSeller" to={`/profile/${relatedProduct.sellerId}`}>
                                            {relatedProduct.seller.username}
                                        </Link>
                                    </p>
                                </div>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </section>
    );

}

export default RelatedProducts;