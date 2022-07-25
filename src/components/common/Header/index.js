import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "../../../utils/const";

import "./style.scss";

export default function Header() {
  let location = useLocation();
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(ROUTES.Main);
  };

  return (
    <header className="header">
      <div className="headerBody">
        {location?.pathname !== ROUTES.Main && (
          <div className="buttonBack" onClick={onClickBack}>
            {"<"}
          </div>
        )}

        <h1 className="headerTitle">TRELLO</h1>
      </div>
    </header>
  );
}
