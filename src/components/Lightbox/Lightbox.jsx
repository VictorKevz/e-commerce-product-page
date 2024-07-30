import React, { useState } from "react";
import iconClose from "../../assets/images/icon-close.svg";
import iconNext from "../../assets/images/icon-next.svg";
import iconPrev from "../../assets/images/icon-previous.svg";
import { motion, AnimatePresence } from "framer-motion";

import "../css/lightbox.css";
import productData from "../Product/Data";

function Lightbox({ onClose }) {
  const [currentID, setID] = useState(0);
  const { mainIMG, id } = productData[currentID];

  const updateID = (currentID) => setID(currentID);

  const nextSlide = ()=>{
    setID((prevIndex)=>(prevIndex + 1) % productData.length)
  }
  const prevSlide = ()=>{
    setID((prevIndex) =>
        prevIndex === 0 ? productData.length - 1 : prevIndex - 1
      );
  }
  const imageVariants = {
    hidden: { opacity: .8, x: 0 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: .8, x: 0 },
  };

  const thumbnailVariants = {
    hidden: { y: 50, x: 0 },
    visible: { y: 0, x: 0 },
  };
  return (
    <div className="lightbox-wrapper">
      <div className="lightbox-container">
        <button className="close-lightbox" onClick={onClose}>
          <img src={iconClose} alt="close-icon" className="close-icon" />
        </button>
        <div className="image-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={id}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="image-wrapper"
              variants={imageVariants}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <img src={mainIMG} alt="" className="product-img" />
              <button className="controls prev" onClick={prevSlide}>
                <img src={iconPrev} alt="" className="prev-icon" />
              </button>
              <button className="controls next" onClick={nextSlide}>
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
                duration: 0.5,
                ease: "easeInOut",
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
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
