import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Panel } from "./views/Panel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
