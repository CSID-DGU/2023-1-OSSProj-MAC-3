import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./Join";
import Select from "./Select";
import Team from "./Team";
//import {Typography, Box} from "@mui/material";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/select" element={<Select />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
