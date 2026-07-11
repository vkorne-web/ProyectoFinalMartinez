import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem } = useCart();
  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <img className="cart-item-img" src={item.image} alt={item.title} />
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p>Precio unitario: $ {item.price.toFixed(2)}</p>
        <p>Cantidad: {item.quantity}</p>
        <p className="cart-item-price">Subtotal: $ {subtotal.toFixed(2)}</p>
      </div>
      <button
        className="cart-item-remove"
        onClick={() => removeItem(item.id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
