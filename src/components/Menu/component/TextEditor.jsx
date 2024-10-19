import React from "react";
import { Flex } from "antd";
import ReactQuill from "react-quill";

const TextEditor = ({ box, onPropertyChange }) => {
  return (
    <Flex vertical gap="middle">
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
};

export default TextEditor;
