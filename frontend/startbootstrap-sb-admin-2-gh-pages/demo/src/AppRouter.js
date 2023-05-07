import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./Join";
import Select from "./Select";
//import {Typography, Box} from "@mui/material";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/select" element={<Select />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
