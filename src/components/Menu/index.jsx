import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useDrag } from "react-dnd";
import { Flex, Input } from "antd";
import ImageComponent from "../Image";
import TextComponent from "../Text";

const getItem = (label, key, children, icon) => {
  return {
    label,
    key,
    children,
    // icon,
  };
};
const TOOL = "tool";

const createDraggableItem = (content, label, type, key) => {
  const [{ isDragging }, drag] = useDrag({
    type: TOOL,
    item: {
      type: type,
      name: content,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return {
    key,
    label: (
      <div className="tool" ref={drag}>
        {label}
      </div>
    ),
  };
};

const MenuComponent = ({
  text,
  setText,
  width,
  setWidth,
  height,
  setHeight,
  url,
  setUrl,
  // createDraggableItem,
  boxes,
  setBoxes,
  tool,
  setTool,
  item,
  setItem,
}) => {
  const reset = () => {
    setTool(false);
    setItem(false);
  };
  const onClick = (e) => {
    // reset();
    setItem(false);
    setTool((prev) => !prev);
  };
  const onClick1 = (e) => {
    // reset();
    setTool(false);
    setItem((prev) => !prev);
  };

  const items1 = [
    createDraggableItem(
      <ImageComponent
        src={url}
        alt="Dropped"
        width={width}
        height={height}
        onClick={onClick}
        show={tool}
      />,
      "圖片元件",
      "tool",
      "1"
    ),
    createDraggableItem(
      <TextComponent
        // src={url}
        text={text}
        // alt="Dropped"
        // width={width}
        // height={height}
        onClick={onClick1}
        show={item}
      />,
      "文字元件",
      "item",
      "2"
    ),
    createDraggableItem("carousel", "輪播元件", "3"),
  ];

  useEffect(() => {
    setBoxes(
      boxes?.map((d) =>
        d.type === "tool"
          ? {
              ...d,
              name: (
                <ImageComponent
                  src={url}
                  alt="Dropped"
                  width={width}
                  height={height}
                  onClick={onClick}
                  show={tool}
                />
              ),
            }
          : d.type === "item"
          ? {
              ...d,
              name: (
                <TextComponent text={text} onClick={onClick1} show={item} />
              ),
            }
          : d
      )
    );
  }, [width, height, url, text, tool, item]);

  return (
    <>
      {tool ? (
        <Flex vertical gap={12}>
          <Input
            placeholder="width"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
            }}
          />
          <Input
            placeholder="height"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
          <Input
            placeholder="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </Flex>
      ) : item ? (
        <Input
          placeholder="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      ) : (
        <Menu
          theme="dark"
          // defaultSelectedKeys={["1"]}
          mode="inline"
          items={items1}
        />
      )}
    </>
  );
};

export default MenuComponent;
