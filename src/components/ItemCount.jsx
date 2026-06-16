import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const initialValue = initial || 1;
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (onAdd) {
      onAdd(count);
    }
  };

  return (
    <div className="item-count">
      <div className="item-count-controls">
        <button
          className="count-btn"
          onClick={decrement}
          disabled={count <= 1}
        >
          -
        </button>
        <span className="count-display">{count}</span>
        <button
          className="count-btn"
          onClick={increment}
          disabled={count >= stock}
        >
          +
        </button>
      </div>
      <p className="count-stock">Stock: {stock} unidades</p>
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={stock === 0}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
