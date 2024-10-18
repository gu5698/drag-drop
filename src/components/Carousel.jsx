import React, { useState, useEffect, useRef } from "react";
import { Carousel, Tag } from "antd";
import PropTypes from "prop-types";

const CarouselComponent = ({ images, width, height, onClick, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    setIsFocused(true);

    const handleClickOutside = (event) => {
      if (carouselRef.current && !carouselRef.current.contains(event.target)) {
        setIsFocused(false);
      } else {
        setIsFocused(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(id);
  };

  const numericHeight = Number(height.replace("px", ""));
  const numericWidth = Number(width.replace("px", ""));
  const aspectRatio = numericWidth / numericHeight;

  return (
    <div
      ref={carouselRef}
      className={`carousel-component ${
        isFocused ? "focused" : ""
      } customCarousel`}
      tabIndex={0}
      onClick={handleClick}
    >
      <Tag className="tag" color="green">
        輪播元件
      </Tag>
      <div
        style={{
          width: "100%",
          maxWidth: numericWidth,
          height: "100%",
          maxHeight: numericHeight,
          aspectRatio,
        }}
      >
        <Carousel autoplay adaptiveHeight>
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

CarouselComponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CarouselComponent;
