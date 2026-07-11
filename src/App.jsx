import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import CartContainer from "./components/CartContainer";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={<ItemListContainer greeting="Bienvenido a TechStore!" />}
              />
              <Route
                path="/category/:categoryId"
                element={<ItemListContainer greeting="Productos por categoria" />}
              />
              <Route
                path="/item/:itemId"
                element={<ItemDetailContainer />}
              />
              <Route
                path="/cart"
                element={<CartContainer />}
              />
              <Route
                path="/checkout"
                element={<CheckoutForm />}
              />
              <Route
                path="*"
                element={
                  <div className="not-found">
                    <h1>404</h1>
                    <h2>Pagina no encontrada</h2>
                    <p>La ruta que buscas no existe.</p>
                    <a href="/" className="back-link">Volver al inicio</a>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
