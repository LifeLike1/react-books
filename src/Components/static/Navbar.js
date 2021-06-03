import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <span className="navbar__title">Logo</span>
        <ul className="navbar__list">
          <Link to="/" className="navbar__item">
            Home
          </Link>
          <Link to="/favourites" className="navbar__item">
            Favourite
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
