import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <span className="navbar__title">Książki</span>
        <ul className="navbar__list">
          <Link to="/" className="navbar__item">
            Strona Główna
          </Link>
          <Link to="/favourites" className="navbar__item">
            Ulubione
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
