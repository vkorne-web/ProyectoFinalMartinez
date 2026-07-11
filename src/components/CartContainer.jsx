import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const CartContainer = () => {
  const { cartItems, removeItem, clearCart, getTotalQuantity, getTotalPrice } = useCart();
  const totalQty = getTotalQuantity();

  if (totalQty === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Tu carrito esta vacio</h2>
          <p>Agrega productos desde el catalogo para empezar a comprar.</p>
          <Link to="/" className="back-link">Ir al catalogo</Link>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito de compras</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">
          Total ({totalQty} productos): <strong>$ {totalPrice.toFixed(2)}</strong>
        </p>
        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="checkout-link">
            Finalizar compra
          </Link>
          <Link to="/" className="back-link">Seguir comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
