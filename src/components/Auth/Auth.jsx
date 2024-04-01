import "./Auth.scss";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../features/user/userSlice';
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";
// const dispatch = useDispatch();

export default function Auth({ setIsLoggedIn, setUser, setUserId }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const { mode } = useParams();

  // handle auth/signup and auth/login
  useEffect(() => {
    if (mode === "signup" && isLoginMode) {
      setIsLoginMode(false);
    } else if (mode === "login" && !isLoginMode) {
      setIsLoginMode(true);
    }
  }, [mode, isLoginMode]);

  const toggleLoginMode = () => {
    if (isLoginMode) {
      navigate("/auth/signup");
    } else {
      navigate("/auth/login");
    }
    setIsLoginMode((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    const url = `${API_URL}/auth/${mode}`;

    try {
      if (!isLoginMode && password !== confirmPassword) {
        setFeedback("Passwords don't match!");
        return;
      }

      const response = await axios.post(url, { username, password });
      setFeedback(response.data.message);
      if (response.status === 200 || response.status === 201) {
        const user = await axios.get(`${API_URL}/auth/check`);
        setIsLoggedIn(true);
        setUser(user.data.user);
        const userId = response.data.user.user_id;
        setUserId(userId);
        navigate(`/home/${userId}`); // if login successful navigate to user home
        // navigate(`/getting-started/${userID}`); // if account creation successfull, navigate

        dispatch(fetchUserProfile(userId));
      }
      if (response.status === 201) {
        console.log("if log in: ", response.data);
        setIsLoggedIn(true);
        // setUser(username);
        const userId = response.data.user_id;
        setUserId(userId);
        navigate(`/getting-started/${userId}`); // if account creation successfull, navigate to getting-started
      }
    } catch (err) {
      console.error(err);
      setFeedback(err.response?.data?.error || "An error occurred!");
    }
  };

  return (
    <>
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-card__title">
          {isLoginMode ? "Welcome Back" : "Sign Up"}
        </h2>
        <form className="login-card__form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoginMode && (
            <input
              className="auth-input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button className="btn-login" type="submit">
            {isLoginMode ? "LOGIN" : "Sign Up"}
          </button>
        </form>

        <button className="btn-toggle-login" onClick={toggleLoginMode}>
          {isLoginMode ? (
            <>
              <h5>Don't have an account?</h5>
              <h5 className="link-style">Sign Up Here</h5>
            </>
          ) : (
            <>
             <h5>Already have an account?</h5>
              <h5 className="link-style">Log In Here</h5>
            </>
          )}
        </button>
      </div>
      {feedback && <p className="display-error">{feedback}</p>}
    </div>
    
    </>
  );
}
