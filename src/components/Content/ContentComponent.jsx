import React, { useState } from "react";
import { Layout, theme } from "antd";
const { Content } = Layout;
import { useDrop } from "react-dnd";
import "./Content.css";
import BoxComponent from "./component/Box.jsx";

const ContentComponent = ({
  boxes,
  setBoxes,
  selectedBoxId,
  setSelectedBoxId,
  onBoxClick,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const ItemTypes = {
    IMAGE: "image",
    TEXT: "text",
    CAROUSEL: "carousel",
  };

  const [hovering, setHovering] = useState(false);

  const [, drop] = useDrop({
    accept: [ItemTypes.IMAGE, ItemTypes.TEXT, ItemTypes.CAROUSEL],
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      setHovering(true);
    },
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const newBox = {
        ...item,
        id: Date.now().toString(),
        left: offset.x,
        top: offset.y,
      };
      setBoxes((prevBoxes) => [...prevBoxes, newBox]);
      setHovering(false);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <Content
      style={{
        margin: "16px",
      }}
    >
      <div
        className="content-container"
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div ref={drop} className={`drop-zone`} style={{ minHeight: "90vh" }}>
          {boxes.map((box) => (
            <BoxComponent
              key={box.id}
              box={box}
              selectedBoxId={selectedBoxId}
              isSelected={box.id === selectedBoxId}
              onClick={onBoxClick}
            />
          ))}
          {hovering && <div className={`drop-overlay`}></div>}
        </div>
      </div>
    </Content>
  );
};

export default ContentComponent;
