import React, { useState } from "react";
import Header from "../Header/Header";
import "../css/product.css";
import productData from "./Data";
import decrementIcon from "../../assets/images/icon-minus.svg";
import incrementIcon from "../../assets/images/icon-plus.svg";
import cart from "../../assets/images/icon-cart.svg";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "../Lightbox/Lightbox";

function Product() {
  const [currentID, setID] = useState(0);
  const { mainIMG, price, id } = productData[currentID];
  const [quantity, setQuantity] = useState(0);
  const[cartItems, setCartItems] = useState(0)
  const[addItems, setAddItems] = useState(false);
 const[showLightBox,setLightBox] = useState(false)

  const updateID = (currentID) => setID(currentID);
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const updateItems = () => {
    setCartItems((prevItems) =>(prevItems + quantity));
    setAddItems(true)

   
  };
const deleteItems = () =>{
setCartItems(0)
setQuantity(0)
}

const openLightBox = () => setLightBox(true);
const closeLightBox = () => setLightBox(false)
;


  const imageVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 1, x: 0 },
  };


  return (
    <div className="product-wrapper">
      <Header cartItems={cartItems} addItems={addItems} onDelete={deleteItems}/>
      <div className="product-container">
        <div className="image-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={imageVariants}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              onClick={openLightBox}
            >
              <img src={mainIMG} alt="" className="product-img" />
            </motion.div>
          </AnimatePresence>
          <div className="thumbnails-container">
            {productData.map((link) => (
              <div key={link.id} onClick={() => updateID(link.id)}>
                <img
                  src={link.thumbnail}
                  alt=""
                  className={`thumbnail-img ${link.id === currentID && "active"}`}
                />
              </div>
            ))}
          </div>
        </div>
        <article className="text-container">
          <p className="caption">SNEAKER COMPANY</p>
          <h1 className="title">Fall Limited Edition Sneakers</h1>
          <p className="parag">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>
          <div className="price-discount-container">
            <h2 className="price">
              {`$${price.toFixed(2)}`}
              <span className="discount">50%</span>
            </h2>
            <p className="old-price">{`$${price.toFixed(2)}`}</p>
          </div>
          <div className="buttons-container">
            <div className="minus-plus-btn-container">
              <button className="btn-minus" onClick={decrementQuantity}>
                <img
                  src={decrementIcon}
                  alt="minus-icon"
                  className="minus-icon"
                />
              </button>
              <span className="quantity">{quantity}</span>
              <button className="btn-plus" onClick={incrementQuantity}>
                <img
                  src={incrementIcon}
                  alt="plus-icon"
                  className="plus-icon"
                />
              </button>
            </div>
            <button className="add-btn" disabled={quantity === 0} onClick={updateItems}>
              <img src={cart} alt="cart icon" className="btn-cart-icon" />
              Add to cart
            </button>
          </div>
        </article>
      </div>
      {showLightBox && (<Lightbox onClose ={closeLightBox}/>)}

    </div>
  );
}

export default Product;