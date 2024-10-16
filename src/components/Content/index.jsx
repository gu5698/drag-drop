import { useState, useEffect } from "react";
import { Layout, theme } from "antd";
const { Content } = Layout;
import { useDrop } from "react-dnd";
import "./Content.css";
import ImageComponent from "../Image.jsx";
import { useDrag } from "react-dnd";

const ContentComponent = ({
  width,
  setWidth,
  height,
  setHeight,
  url,
  setUrl,
  boxes,
  setBoxes,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const ItemTypes = {
    TOOL: "tool",
    ITEM: "item",
    WIDGET: "widget",
  };

  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: [ItemTypes.TOOL, ItemTypes.ITEM, ItemTypes.WIDGET],
    canDrop: () => true,
    drop: (item) => {
      if (isOverCurrent) {
        setBoxes([
          ...boxes,
          {
            ...item,
            name: {
              ...item.name,
              key: boxes.length,
            },
          },
        ]);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <Content
      style={{
        margin: "16px",
        // minHeight: "100vh",
      }}
    >
      <div
        className="content-container"
        style={{
          padding: 24,
          // minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {boxes?.map((box, index) => (
          <div key={index}>{box.name}</div>
        ))}
        <div className={`drop-area ${canDrop ? "highlight" : ""}`} ref={drop}>
          {/* Drag here */}
        </div>
      </div>
    </Content>
  );
};

export default ContentComponent;
