import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../data/orders";

const CheckoutForm = () => {
  const { cartItems, getTotalPrice, getTotalQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no tiene un formato valido.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El telefono es obligatorio.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setLoading(true);

    const order = {
      buyer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: getTotalPrice()
    };

    try {
      const id = await createOrder(order);
      setOrderId(id);
      clearCart();
    } catch (error) {
      console.error("Error al generar la orden:", error);
      setErrors({ submit: "Ocurrio un error al procesar la compra. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  // Compra confirmada: mostramos el id de la orden generada en Firestore.
  if (orderId) {
    return (
      <div className="checkout-container">
        <div className="checkout-success">
          <h2>Compra realizada con exito!</h2>
          <p>Gracias por tu compra. Guarda el siguiente numero de orden:</p>
          <p className="order-id">{orderId}</p>
          <Link to="/" className="back-link">Volver al catalogo</Link>
        </div>
      </div>
    );
  }

  // Carrito vacio: no tiene sentido mostrar el formulario.
  if (getTotalQuantity() === 0) {
    return (
      <div className="checkout-container">
        <div className="cart-empty">
          <h2>No hay productos para comprar</h2>
          <p>Agrega productos al carrito antes de finalizar la compra.</p>
          <Link to="/" className="back-link">Ir al catalogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar compra</h2>

      <div className="checkout-summary">
        <h3>Resumen de tu pedido</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-summary-item">
            <span>{item.title} x {item.quantity}</span>
            <span>$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="checkout-summary-total">
          <strong>Total:</strong>
          <strong>$ {getTotalPrice().toFixed(2)}</strong>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        {errors.submit && <p className="form-error">{errors.submit}</p>}

        <button type="submit" className="checkout-btn" disabled={loading}>
          {loading ? "Procesando compra..." : "Confirmar compra"}
        </button>
        <Link to="/cart" className="back-link">Volver al carrito</Link>
      </form>
    </div>
  );
};

export default CheckoutForm;
