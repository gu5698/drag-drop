import React from "react";
import ImageEditor from "./ImageEditor";
import TextEditor from "./TextEditor";
import CarouselEditor from "./CarouselEditor";

const PropertyEditor = ({ box, onPropertyChange }) => {
  if (!box) return null;

  switch (box.type) {
    case "image":
      return <ImageEditor box={box} onPropertyChange={onPropertyChange} />;
    case "text":
      return <TextEditor box={box} onPropertyChange={onPropertyChange} />;
    case "carousel":
      return <CarouselEditor box={box} onPropertyChange={onPropertyChange} />;
    default:
      return null;
  }
};

export default PropertyEditor;
