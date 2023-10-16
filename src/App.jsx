import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import GettingStartedPage from "./pages/GettingStartedPage/GettingStartedPage";

import { API_URL } from "./utils/constants";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');

  // check is user is autheticaed/logged in
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_URL}/auth/check`)
        .then(response => {
          setIsLoading(false);
            console.log(response.data);
            if (response.data.isAuthenticated) {
                setIsLoggedIn(true);
                setUser(response.data.user);
                setUserId(response.data.user.id);
            } else {
                setIsLoggedIn(false);
            }
        })
        .catch(error => {
            setIsLoading(false);
            console.error("Error checking authentication status", error);
            setIsLoggedIn(false);
        });
}, []);  // The empty a

  return (
    <BrowserRouter>
      <div className="app-background">
        <Header />
        <Routes>
        <Route path="/" element={isLoading ? <div>Loading...</div> : (isLoggedIn ? <Navigate to={`/home/${userId}`} /> : <Navigate to="/auth/login" />)} />
          {/* <Route path="/" element={isLoggedIn ? <Navigate to={`/home/${userId}`} /> : <Navigate to="/auth/login" />} /> */}
          <Route path="/auth/:mode" element={<Auth setIsLoggedIn={setIsLoggedIn} setUser={setUser} setUserId={setUserId}/>} />
          <Route path="/getting-started/:userId" element={<GettingStartedPage />} />
          <Route
            path="/home/:userId"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/auth/login" />}
          />
          {/* <Route path="/home/:userId" element={<HomePage />} /> */}
        </Routes>
        <Footer setIsLoggedIn={setIsLoggedIn} />
      </div>
    </BrowserRouter>
  );
}
