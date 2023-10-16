import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import GettingStartedPage from "./pages/GettingStartedPage/GettingStartedPage";
import ChatPage from "./pages/ChatPage/ChatPage";

import { API_URL } from "./utils/constants";
import Footer from "./components/Footer/Footer";
import FlashCardsPage from "./pages/FlashCardPage/FlashCardPage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  // check is user is autheticaed/logged in
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/auth/check`)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUser(response.data.user);
          setUserId(response.data.user.user_id);
          console.log(response);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error checking authentication status", error);
        setIsLoggedIn(false);
      });
  }, []); // The empty a

  return (
    <BrowserRouter>
      <div className="app-background">
        <Header />
        <Routes>
          {/* Initialize Loading > IF logged in go to home ELSE go to login */}
          <Route
            path="/"
            element={
              isLoading ? (
                <div>Loading...</div>
              ) : isLoggedIn ? (
                <Navigate to={`/home/${userId}`} />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
          {/* Go to Login or Sign Up  */}
          <Route
            path="/auth/:mode"
            element={
              <Auth
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
                setUserId={setUserId}
              />
            }
          />
          {/* After signing up go to Getting Started | Account Details */}
          <Route
            path="/getting-started/:userId"
            element={<GettingStartedPage />}
          />
          {/* Go to Home Page to See FlashCard, Chat, User Info, and Dicitonary */}
          <Route
            path="/home/:userId"
            element={
              isLoading ? (
                <div>Loading...</div>
              ) : isLoggedIn ? (
                <HomePage user={user} />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
           <Route path="/flashcards" element={<FlashCardsPage />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
          {/* <Route path="/home/:userId" element={<HomePage />} /> */}
        </Routes>
        <Footer setIsLoggedIn={setIsLoggedIn} />
      </div>
    </BrowserRouter>
  );
}
