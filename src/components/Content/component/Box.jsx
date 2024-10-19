import React, { useState, useEffect, useRef } from "react";
import { Tag } from "antd";
import ImageComponent from "./Image.jsx";
import TextComponent from "./Text.jsx";
import CarouselComponent from "./Carousel.jsx";

const BoxComponent = ({ box, isSelected, onClick, style, selectedBoxId }) => {
  const [isFocused, setIsFocused] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    setIsFocused(true);

    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsFocused(true);
    onClick(box.id);
  };

  const renderComponent = () => {
    switch (box.type) {
      case "image":
        return <ImageComponent {...box} />;
      case "text":
        return <TextComponent {...box} />;
      case "carousel":
        return <CarouselComponent {...box} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={componentRef}
      className={`box-component ${isFocused ? "focused" : ""} ${
        isSelected ? "selected" : ""
      }`}
      style={style}
      tabIndex={0}
      onClick={handleClick}
    >
      <Tag className="tag" color="green">
        {box.label}
      </Tag>
      {renderComponent()}
    </div>
  );
};

export default BoxComponent;
