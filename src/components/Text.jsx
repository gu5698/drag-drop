import React, { useState, useEffect, useRef } from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";

const TextComponent = ({ text, onClick, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    setIsFocused(true);

    const handleClickOutside = (event) => {
      if (textRef.current && !textRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (onClick) onClick(id);
  };

  return (
    <div
      ref={textRef}
      className={`text ${isFocused ? "focused" : ""}`}
      tabIndex={0}
      onClick={handleClick}
    >
      <Tag className="tag" color="green">
        文字元件
      </Tag>
      <p>{text}</p>
    </div>
  );
};

TextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  show: PropTypes.bool,
};

export default TextComponent;
