import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="app-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}
