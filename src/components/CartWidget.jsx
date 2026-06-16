import { useCart } from "../context/CartContext";

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalQty = getTotalQuantity();

  return (
    <div className="cart-widget">
      <span role="img" aria-label="carrito" className="cart-icon">??</span>
      {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
    </div>
  );
};

export default CartWidget;
