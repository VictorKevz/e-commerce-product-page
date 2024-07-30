import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import cart from "../../assets/images/icon-cart.svg";
import avatar from "../../assets/images/image-avatar.png";
import "../css/header.css";
import Cart from "../Cart/Cart";

function Header({cartItems,addItems,onDelete}) {
    const[iconClicked, setIconClicked] = useState(false);
    function toggleCart(){
        setIconClicked(!iconClicked)
    }

  return (
    <header className="header-wrapper">
      <nav className="nav-container">
        <div className="logo-links-container">
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <ul className="links-container">
            <li className="nav-link">Collections</li>
            <li className="nav-link">Men</li>
            <li className="nav-link">Women</li>
            <li className="nav-link">About</li>
            <li className="nav-link">Contact</li>
          </ul>
        </div>
        <div className="avatar-cart-container">
          <div className="cart-icon-container" onClick={toggleCart}>
          {addItems && <span className="cart-qty">{cartItems <= 0 ? null : cartItems}</span>}
            <img src={cart} alt="cart icon" className="cart-icon" />
            

          </div>

          <img src={avatar} alt="avatar image" className="avatar-icon" />
        </div>
      </nav>
      <div className="mask open"></div>
      {iconClicked && <Cart cartItems={cartItems} onDelete={onDelete}/>}

    </header>
  );
}

export default Header;
