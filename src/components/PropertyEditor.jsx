import React from "react";
import { Input, InputNumber, Button } from "antd";

const PropertyEditor = ({ box, onPropertyChange }) => {
  if (!box) return null;

  const handleImageChange = (index, value) => {
    const newImages = [...box.images];
    newImages[index] = value;
    onPropertyChange("images", newImages);
  };

  const addImage = () => {
    onPropertyChange("images", [...box.images, box.images[0]]);
  };

  const removeImage = (index) => {
    const newImages = box.images.filter((_, i) => i !== index);
    onPropertyChange("images", newImages);
  };

  switch (box.type) {
    case "image":
      return (
        <div>
          <h3>圖片屬性</h3>
          <div>
            <label>寬度：</label>
            <InputNumber
              value={parseInt(box.width)}
              onChange={(value) => onPropertyChange("width", `${value}px`)}
              min={1}
            />
          </div>
          <div>
            <label>高度：</label>
            <InputNumber
              value={parseInt(box.height)}
              onChange={(value) => onPropertyChange("height", `${value}px`)}
              min={1}
            />
          </div>
          <div>
            <label>URL：</label>
            <Input
              value={box.src}
              onChange={(e) => onPropertyChange("src", e.target.value)}
            />
          </div>
        </div>
      );
    case "text":
      return (
        <div>
          <h3>文字屬性</h3>
          <div>
            <label>文字：</label>
            <Input
              value={box.text}
              onChange={(e) => onPropertyChange("text", e.target.value)}
            />
          </div>
          {/* 可以添加更多文字相關的屬性，如字體大小、顏色等 */}
        </div>
      );
    case "carousel":
      return (
        <div>
          <h3>輪播圖屬性</h3>
          <div>
            <label>寬度：</label>
            <InputNumber
              value={parseInt(box.width)}
              onChange={(value) => onPropertyChange("width", `${value}px`)}
              min={1}
            />
          </div>
          <div>
            <label>高度：</label>
            <InputNumber
              value={parseInt(box.height)}
              onChange={(value) => onPropertyChange("height", `${value}px`)}
              min={1}
            />
          </div>
          <div>
            <h4>圖片：</h4>
            {box.images.map((image, index) => (
              <div key={index}>
                <Input
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                />
                <Button onClick={() => removeImage(index)}>移除</Button>
              </div>
            ))}
            <Button onClick={addImage}>添加圖片</Button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default PropertyEditor;
