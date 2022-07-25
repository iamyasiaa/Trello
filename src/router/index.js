import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main, BoardPage } from "../pages";
import { ROUTES } from "../utils/const";
import { Header } from "../components/common";

export default function MainRoute() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path={ROUTES.Main} element={<Main />} />
        <Route exact path={ROUTES.Id} element={<BoardPage />} />
      </Routes>
    </>
  );
}
