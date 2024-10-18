import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const TextComponent = ({ text, width = "auto", height = "auto" }) => {
  // 使用 DOMPurify 清理 HTML 以防止 XSS 攻擊
  const cleanHtml = DOMPurify.sanitize(text);

  return (
    <div
      style={{ width, height, overflow: "auto" }}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

TextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default TextComponent;
