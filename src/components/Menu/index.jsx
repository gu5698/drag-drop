import React from "react";
import { Menu, Button } from "antd";
import { useDrag } from "react-dnd";
import PropertyEditor from "../PropertyEditor";

const TOOL = "tool";

const createDraggableItem = (type, label, initialProps) => {
  const [, drag] = useDrag({
    type: TOOL,
    item: {
      type: type,
      ...initialProps,
    },
  });

  return {
    key: type,
    label: (
      <div className="tool" ref={drag}>
        {label}
      </div>
    ),
  };
};

const MenuComponent = ({
  boxes,
  setBoxes,
  selectedBoxId,
  setSelectedBoxId,
}) => {
  const items = [
    createDraggableItem("image", "圖片元件", {
      width: "300px",
      height: "300px",
      url: "https://picsum.photos/id/1/300/300",
      src: "https://picsum.photos/id/1/300/300",
      alt: "image",
    }),
    createDraggableItem("text", "文字元件", { text: "Hello from Meepshop!" }),
    createDraggableItem("carousel", "輪播圖元件", {
      width: "300px",
      height: "400px",
      images: [
        "https://picsum.photos/id/1/300/200",
        "https://picsum.photos/id/2/300/200",
        "https://picsum.photos/id/3/300/200",
      ],
    }),
  ];

  const handlePropertyChange = (property, value) => {
    setBoxes(
      boxes.map((box) =>
        box.id === selectedBoxId ? { ...box, [property]: value } : box
      )
    );
  };

  const selectedBox = boxes.find((box) => box.id === selectedBoxId);

  return (
    <>
      {selectedBox ? (
        <PropertyEditor
          box={selectedBox}
          onPropertyChange={handlePropertyChange}
        />
      ) : (
        <Menu items={items} />
      )}
    </>
  );
};

export default MenuComponent;
