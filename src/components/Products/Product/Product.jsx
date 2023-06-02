
import { useNavigate } from "react-router-dom";
import "./Product.scss";


const Product = ({ id, data }) => {
    const navigate = useNavigate()
    return <div className="product-card" onClick={() => navigate("/product/" + id)}>
        <div className="thumbnail">
            <img src={import.meta.env.VITE_REACT_APP_DEV_URL + data?.img?.data[0]?.attributes?.url} alt="product" />
        </div>
        <div className="prod-details">
            <span className="name">{data.title}</span>
            <span className="price">&#8360;. {data.price}</span>
        </div>
    </div>;
};

export default Product;
