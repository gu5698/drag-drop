import React from "react";
import ImageComponent from "./Image.jsx";
import TextComponent from "./Text.jsx";
import CarouselComponent from "./Carousel.jsx";

const BoxComponent = ({ box, isSelected, onClick, style }) => {
  switch (box.type) {
    case "image":
      return <ImageComponent {...box} style={style} onClick={onClick} />;
    case "text":
      return <TextComponent {...box} style={style} onClick={onClick} />;
    case "carousel":
      return <CarouselComponent {...box} style={style} onClick={onClick} />;
    default:
      return null;
  }
};
export default BoxComponent;
