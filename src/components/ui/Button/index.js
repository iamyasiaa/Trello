import React from "react";

import "./style.scss";

export default function Button({ children, onClick }) {
  return (
    <button className="custom-btn btn-6" onClick={onClick}>
      <span>{children}</span>
    </button>
  );
}
