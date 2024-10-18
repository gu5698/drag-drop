import React, { useState, useEffect, useRef } from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";

const ImageComponent = ({ src, alt, width, height, onClick, show, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    setIsFocused(true);

    const handleClickOutside = (event) => {
      if (imageRef.current && !imageRef.current.contains(event.target)) {
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
    e.stopPropagation(); // 阻止事件冒泡
    onClick(id);
  };

  return (
    <div
      ref={imageRef}
      className={`image ${isFocused ? "focused" : ""}`}
      tabIndex={0}
      onClick={handleClick}
    >
      <Tag className="tag" color="green">
        圖片元件
      </Tag>
      <div style={{ width, height, overflow: "hidden" }}>
        <img src={src} alt={alt} style={{ width: "auto", height: "100%" }} />
      </div>
    </div>
  );
};

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  show: PropTypes.bool,
};

export default ImageComponent;
