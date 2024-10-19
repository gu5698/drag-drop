import React from "react";
import { Input, Button, Flex } from "antd";

const CarouselEditor = ({ box, onPropertyChange }) => {
  const handleImageChange = (index, value) => {
    const newImages = [...box.images];
    newImages[index] = value;
    onPropertyChange("images", newImages);
  };

  const defaultImg = "https://picsum.photos/id/1/300/300";

  const addImage = () => {
    onPropertyChange("images", [...box.images, defaultImg]);
  };

  const removeImage = (index) => {
    const newImages = box.images.filter((_, i) => i !== index);
    onPropertyChange("images", newImages);
  };

  return (
    <Flex vertical gap="middle">
      <Input
        placeholder="width"
        value={box.width}
        onChange={(e) => onPropertyChange("width", e.target.value)}
      />
      <Input
        placeholder="height"
        value={box.height}
        onChange={(e) => onPropertyChange("height", e.target.value)}
      />
      <br />
      {box.images.map((image, index) => (
        <div key={index}>
          <Input
            placeholder={`slide ${index + 1}`}
            value={image}
            onChange={(e) => handleImageChange(index, e.target.value)}
            allowClear
            onClear={() => removeImage(index)}
          />
        </div>
      ))}
      <Button onClick={addImage}>添加圖片</Button>
    </Flex>
  );
};

export default CarouselEditor;
