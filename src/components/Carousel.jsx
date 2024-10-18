import React from "react";
import { Carousel } from "antd";
import PropTypes from "prop-types";

const CarouselComponent = ({ images, width, height }) => {
  const numericHeight = Number(height.replace("px", ""));
  const numericWidth = Number(width.replace("px", ""));
  const aspectRatio = numericWidth / numericHeight;

  return (
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
  );
};

CarouselComponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default CarouselComponent;
