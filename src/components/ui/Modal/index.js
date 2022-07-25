import React, { useEffect } from "react";

import "./style.scss";

export default function Modal({ active, children, onClose }) {
  const onClickBody = (ev) => {
    ev.stopPropagation();
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [active]);

  return (
    <>
      {active && (
        <div className="modal" onClick={onClose}>
          <div className="modalBody" onClick={onClickBody}>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
