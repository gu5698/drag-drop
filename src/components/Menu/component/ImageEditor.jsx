import React from "react";
import { Input, Flex } from "antd";

const ImageEditor = ({ box, onPropertyChange }) => {
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
      <Input
        placeholder="URL"
        value={box.src}
        onChange={(e) => onPropertyChange("src", e.target.value)}
      />
    </Flex>
  );
};

export default ImageEditor;
