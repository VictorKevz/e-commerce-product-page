import React, { useState } from "react";
import Header from "../Header/Header";
import "../css/product.css";
import productData from "./Data";
import decrementIcon from "../../assets/images/icon-minus.svg";
import incrementIcon from "../../assets/images/icon-plus.svg";
import iconNext from "../../assets/images/icon-next.svg";
import iconPrev from "../../assets/images/icon-previous.svg";
import cart from "../../assets/images/icon-cart.svg";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "../Lightbox/Lightbox";

function Product() {
  const [currentID, setID] = useState(0);
  const { mainIMG, price, id } = productData[currentID];
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [addItems, setAddItems] = useState(false);
  const [showLightBox, setLightBox] = useState(false);

  const updateID = (currentID) => setID(currentID);
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const updateItems = () => {
    setCartItems((prevItems) => prevItems + quantity);
    setAddItems(true);
  };
  const deleteItems = () => {
    setCartItems(0);
    setQuantity(0);
  };

  const openLightBox = () => setLightBox(true);
  const closeLightBox = () => setLightBox(false);
  const nextSlide = () => {
    setID((prevIndex) => (prevIndex + 1) % productData.length);
  };
  const prevSlide = () => {
    setID((prevIndex) =>
      prevIndex === 0 ? productData.length - 1 : prevIndex - 1
    );
  };

  const imageVariants = {
    hidden: { opacity: .8, x: 0 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 1, x: 0, scale: 0.8 },
  };

  const thumbnailVariants = {
    hidden: { y: '100%', x: 0 },
    visible: { y: 0, x: 0 },
  };

  return (
    <div className="product-wrapper">
      <Header
        cartItems={cartItems}
        addItems={addItems}
        onDelete={deleteItems}
      />
      <div className="product-container">
        <AnimatePresence mode="wait">
        <motion.div 
        className="image-container"
        initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeIn",
      }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={id}
              className="image-wrapper"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={imageVariants}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                damping:30
              }}
              onClick={openLightBox}
            >
              <img src={mainIMG} alt="" className="product-img" />
              <button className="controls prev product" onClick={prevSlide}>
                <img src={iconPrev} alt="" className="prev-icon" />
              </button>
              <button className="controls next product" onClick={nextSlide}>
                <img src={iconNext} alt="" className="next-icon" />
              </button>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              className="thumbnails-container"
              initial="hidden"
              animate="visible"
              variants={thumbnailVariants}
              transition={{
                duration: 1.3,
                ease: "easeIn",
              }}
            >
              {productData.map((link) => (
                <div onClick={() => updateID(link.id)} key={link.id}>
                  <img
                    src={link.thumbnail}
                    alt=""
                    className={`thumbnail-img ${
                      link.id === currentID && "active"
                    }`}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        </AnimatePresence>
<AnimatePresence mode="wait">
        <motion.article 
        className="text-container"
        initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 1.3,
        ease: "easeIn",
      }}
        >
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
            <p className="old-price">{`$250`}</p>
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
            <button
              className="add-btn"
              disabled={quantity === 0}
              onClick={updateItems}
            >
              <img src={cart} alt="cart icon" className="btn-cart-icon" />
              Add to cart
            </button>
          </div>
        </motion.article>
</AnimatePresence>
      </div>
      {showLightBox && (
        <div className="lightbox">
          (<Lightbox onClose={closeLightBox} />)
        </div>
      )}
    </div>
  );
}

export default Product;
