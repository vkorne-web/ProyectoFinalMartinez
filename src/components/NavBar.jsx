import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <span className="logo-text">TechStore</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/category/electronica">Electronica</Link></li>
        <li><Link to="/category/ropa">Ropa</Link></li>
        <li><Link to="/category/hogar">Hogar</Link></li>
        <li><Link to="/category/deportes">Deportes</Link></li>
      </ul>
      <div className="navbar-cart">
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;
