import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <div className="item-card">
      <div className="item-card-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="item-card-body">
        <h3 className="item-card-title">{product.title}</h3>
        <p className="item-card-category">{product.category}</p>
        <p className="item-card-price">$ {product.price.toFixed(2)}</p>
        <Link to={"/item/" + product.id} className="item-card-link">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default Item;
