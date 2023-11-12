import { Tag } from "antd";
import React from "react";

interface ICustomTag {
  color?: string;
  text?: string;
}

const CustomTag = ({ color, text }: ICustomTag) => {
  return (
    <Tag
      bordered={false}
      style={{
        backgroundColor: color + "22",
        color: color,
      }}>
      {text}
    </Tag>
  );
};

export default CustomTag;
