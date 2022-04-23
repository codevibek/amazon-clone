import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <>
      <nav className="header">
        <Link to="/">
          <div className="brand__name">Amazon Clone</div>
        </Link>
        <div className="header__search">
          <input type="text" className="header__searchInput" />

          <SearchIcon className="header__searchIcon"></SearchIcon>
        </div>
        {/* the navigation stuff */}
        <div className="header__nav">
          <Link to={!user && "/login"} className="header__link">
            <div className="header__option" onClick={handleAuthentication}>
              <span className="header__optionLineOne">
                Hello {user ? user.email : "Guest"}
              </span>
              <span className="header__optionLineTwo">
                {user ? "Logout" : "Login"}
              </span>
            </div>
          </Link>

          <Link to="/orders" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo"> Orders</span>
            </div>
          </Link>

          <Link to="/checkout" className="header__link">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {" "}
                {basket.length}
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Header;
