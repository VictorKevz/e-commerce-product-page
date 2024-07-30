import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/images/logo.svg";
import cart from "../../assets/images/icon-cart.svg";
import avatar from "../../assets/images/image-avatar.png";
import iconClose from "../../assets/images/icon-menu-close.svg";
import iconMenu from "../../assets/images/icon-menu.svg";

import "../css/header.css";
import Cart from "../Cart/Cart";

function Header({ cartItems, addItems, onDelete }) {
  const [cartClicked, setCartClicked] = useState(false);
  function toggleCart() {
    setCartClicked(!cartClicked);
  }

  const [menuClicked, setMenuClicked] = useState(false);
  function toggleMenu() {
    setMenuClicked(!menuClicked);
  }

  return (
    <motion.header
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{
        duration: 1.3,
        ease: "easeIn",
      }}
      className="header-wrapper"
    >
      <nav className="nav-container">
        <div className="logo-links-container">
          <div className="toggle-container" onClick={toggleMenu}>
            <img
              src={menuClicked ? iconClose : iconMenu}
              alt={`${menuClicked ? "icon-close" : "icon-menu"}`}
              className={`${menuClicked ? "menu-icon-close" : "icon-menu"}`}
            />
          </div>
          <div className={`logo-container ${menuClicked && "hide"}`}>
            <img src={logo} alt="logo" className="logo" />
          </div>
          <ul className={`links-container ${menuClicked && "open"}`}>
            <li className="nav-link">Collections</li>
            <li className="nav-link">Men</li>
            <li className="nav-link">Women</li>
            <li className="nav-link">About</li>
            <li className="nav-link">Contact</li>
          </ul>
        </div>
        <div className="avatar-cart-container">
          <div
            className={`cart-icon-container ${menuClicked && "hide"}`}
            onClick={toggleCart}
          >
            {addItems && (
              <span className="cart-qty">
                {cartItems <= 0 ? null : cartItems}
              </span>
            )}
            <img src={cart} alt="cart icon" className="cart-icon" />
          </div>

          <img src={avatar} alt="avatar image" className="avatar-icon" />
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {menuClicked && (
          <motion.div
            className={`mask ${menuClicked && "open"}`}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            
          >
            <div className="inner-mask"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {cartClicked && <Cart cartItems={cartItems} onDelete={onDelete} />}
    </motion.header>
  );
}

export default Header;
