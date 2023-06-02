import { useState, useContext } from "react"

import "./SingleProduct.scss";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import "./SingleProduct.scss"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Context } from "../../utils/context";

import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus
} from "react-icons/fa";




const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()
    const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
    const { handleAddToCart } = useContext(Context);
    const increment = () => {
        setQuantity(prevState => prevState + 1)
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(prevState => prevState - 1)
        }
    };

    if (!data) return;
    const products = data.data[0].attributes

    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img src={import.meta.env.VITE_REACT_APP_DEV_URL + products?.img?.data[0]?.attributes?.url} alt="product" />
                    </div>
                    <div className="right">
                        <span className="name">{products.title}</span>
                        <span className="price">Rs. {products.price}</span>
                        <span className="desc">{products.desc} </span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={decrement}>-</span>
                                <span >{quantity}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button className="add-to-cart-button" onClick={() => {
                                handleAddToCart(data?.data[0], quantity)
                            }}>
                                <FaCartPlus />
                                ADD TO CART
                            </button>
                        </div>
                        <span className="divider" />

                        <div className="info-item">
                            <span className="text-bold">
                                Category:&nbsp;
                                <span>{products?.categories?.data[0]?.attributes?.title}</span>
                            </span>
                            <span className="text-bold">

                                <span className="social-icons">
                                    < FaFacebookF size={16} />
                                    < FaTwitter size={16} />
                                    < FaInstagram size={16} />
                                    < FaLinkedinIn size={16} />
                                    < FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <RelatedProducts productId={id} categoryId={products?.categories?.data[0]?.id} />
            </div>
        </div>
    );
};

export default SingleProduct;
