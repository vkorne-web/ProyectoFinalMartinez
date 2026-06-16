import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../data/productsAsync";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setLoading(true);

    const fetchProducts = categoryId
      ? getProductsByCategory(categoryId)
      : getProducts();

    fetchProducts
      .then((data) => {
        setProducts(data);
        if (categoryId) {
          setCategoryName(categoryId.charAt(0).toUpperCase() + categoryId.slice(1));
        } else {
          setCategoryName("");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h1 className="greeting-message">
        {categoryId ? "Categoria: " + categoryName : greeting}
      </h1>
      {loading ? (
        <div className="loading-spinner">Cargando productos...</div>
      ) : products.length === 0 ? (
        <p className="empty-message">
          No hay productos en esta categoria.
        </p>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;
