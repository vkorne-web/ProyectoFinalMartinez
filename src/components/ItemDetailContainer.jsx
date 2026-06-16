import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/productsAsync";
import ItemCount from "./ItemCount";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(Number(itemId))
      .then((data) => {
        setProduct(data);
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <div className="loading-spinner">Cargando producto...</div>;
  }

  if (!product) {
    return (
      <div className="not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="back-link">Volver al catalogo</Link>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <div className="item-detail">
        <div className="item-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="item-detail-info">
          <h2 className="item-detail-title">{product.title}</h2>
          <p className="item-detail-category">Categoria: {product.category}</p>
          <p className="item-detail-price">$ {product.price.toFixed(2)}</p>
          <p className="item-detail-description">{product.description}</p>
          <p className="item-detail-stock">
            Stock disponible: {product.stock} unidades
          </p>
          <ItemCount stock={product.stock} initial={1} />
          <Link to="/" className="back-link">{'<-'} Volver al catalogo</Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
