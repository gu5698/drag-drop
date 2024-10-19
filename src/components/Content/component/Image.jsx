import React from "react";
import PropTypes from "prop-types";

const ImageComponent = ({ src, width, height }) => {
  return (
    <div style={{ width, height, overflow: "hidden" }}>
      <img src={src} alt="image" style={{ width: "auto", height: "100%" }} />
    </div>
  );
};

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default ImageComponent;
