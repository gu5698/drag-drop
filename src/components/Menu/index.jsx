import React from "react";
import { Menu, Button } from "antd";
import { useDrag } from "react-dnd";
import PropertyEditor from "../PropertyEditor";

const TOOL = "tool";

const createDraggableItem = (type, label, initialProps) => {
  const [, drag] = useDrag({
    type: TOOL,
    item: {
      type,
      label,
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
      src: "https://picsum.photos/id/1/300/300",
    }),
    createDraggableItem("text", "文字元件", {
      width: "300px",
      height: "300px",
      text: "Hello from Meepshop!",
    }),
    createDraggableItem("carousel", "輪播圖元件", {
      width: "300",
      height: "300",
      images: [
        "https://picsum.photos/id/1/300/300",
        "https://picsum.photos/id/2/300/300",
        "https://picsum.photos/id/3/300/300",
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
        <Menu theme="dark" mode="inline" items={items} selectable={false} />
      )}
    </>
  );
};

export default MenuComponent;
