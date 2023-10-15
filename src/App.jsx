import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import GettingStartedPage from "./pages/GettingStartedPage/GettingStartedPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');

  return (
    <BrowserRouter>
      <div className="app-background">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/:mode" element={<Auth setIsLoggedIn={setIsLoggedIn} setUser={setUser} setUserId={setUserId}/>} />
          <Route path="/getting-started/:UserId" element={<GettingStartedPage />} />
          <Route
            path="/home/:UserId"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/auth/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
