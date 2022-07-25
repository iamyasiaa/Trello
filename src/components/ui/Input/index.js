import React from "react";

import "./style.scss";

export default function Input(props) {
  const { placeholder, handleChange, value, text } = props;

  return (
    <div className="blockInput">
      <div className="textBlock">
        <div className="name">
          <div className="text">{text}</div>
        </div>
      </div>
      <div className="block">
        <input
          placeholder={placeholder}
          className="input"
          onChange={handleChange}
          value={value}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
