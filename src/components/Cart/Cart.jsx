import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import deleteIcon from "../../assets/images/icon-delete.svg";
import thumbnail from "../../assets/images/image-product-1-thumbnail.jpg";
import emptyCart from "../../assets/images/empty-cart.webp";
import "../css/cart.css";

function Cart({ cartItems,onDelete }) {
  const total = (cartItems * 125.0).toFixed(2);
  return (
    <AnimatePresence mode="wait">
    <motion.div 
    className="cart-wrapper"
    initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0, scale: 0.7 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <div className="cart-header">
        <h3 className="cart-title">Cart</h3>
      </div>

      <div className="cart-container">
        {cartItems > 0 ? (
          <div className="filled-cart-container">
            <div className="filled-inner-container">
            <img src={thumbnail} alt="" className="thumbnail-img cart" />
            <div className="cart-text">
              <p className="name">Fall Limited Edition Sneakers</p>
              <p className="bill">
                $125.00 x {`${cartItems}`}{" "}
                <span className="total">{`$${total}`}</span>
              </p>
            </div>
            <button className="delete-btn" onClick={onDelete}>
              <img src={deleteIcon} alt="delete icon" className="delete-icon" />
            </button>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        ) : (
          <div className="empty-cart-container">
            <p className="empty-cart">Your cart is empty </p>
            <img src={emptyCart} alt="empty-cart illustration" className="empty-cart-img" />
          </div>
        )}
      </div>
    </motion.div>
    </AnimatePresence>
  );
}

export default Cart;
