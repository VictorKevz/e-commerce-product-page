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

  const imageVariants = {
    hidden: { opacity: 10, x: 0 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 10, x: 100 },
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
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <img src={mainIMG} alt="" className="product-img" />
              <button className="controls prev">
                <img src={iconPrev} alt="" className="prev-icon" />
              </button>
              <button className="controls next">
                <img src={iconNext} alt="" className="next-icon" />
              </button>
            </motion.div>
          </AnimatePresence>
          <div className="thumbnails-container">
            {productData.map((link) => (
              <div key={link.id} onClick={() => updateID(link.id)}>
                <img
                  src={link.thumbnail}
                  alt=""
                  className={`thumbnail-img ${
                    link.id === currentID && "active"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
