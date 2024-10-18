import React from "react";
import { Input, Button, Flex } from "antd";
import ReactQuill from "react-quill";

const PropertyEditor = ({ box, onPropertyChange }) => {
  if (!box) return null;

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

  switch (box.type) {
    case "image":
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
    case "text":
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
          <ReactQuill
            theme="snow"
            className="quill-dark"
            value={box.text}
            onChange={(content) => onPropertyChange("text", content)}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </Flex>
      );
    case "carousel":
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
          <br></br>
          {box.images.map((image, index) => (
            <div key={index}>
              <Input
                placeholder={`slide ${index + 1}`}
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                allowClear
                onClear={(e) => removeImage(index)}
              />
            </div>
          ))}
          <Button onClick={addImage}>添加圖片</Button>
        </Flex>
      );
    default:
      return null;
  }
};

export default PropertyEditor;
