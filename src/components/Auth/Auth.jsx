import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function Auth({ setIsLoggedIn, setUser, setUserId }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState(""); // For server response messages
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
      if (response.status === 200) {
        console.log(response.data)
        setIsLoggedIn(true);
        setUser(username);
        const userID = response.data.user.user_id;
        setUserId(userID)
        navigate(`/home/${userID}`); // if login successful navigate to user home
        // navigate(`/getting-started/${userID}`); // if account creation successfull, navigate 
      }
      if (response.status === 201) {
        setIsLoggedIn(true);
        setUser(username);
        const userID = response.data.user_id;
        setUserId(userID)
        navigate(`/getting-started/${userID}`); // if account creation successfull, navigate to getting-started
      }
    } catch (err) {
      setFeedback(err.response?.data?.error || "An error occurred!");
    }
  };

  return (
    <div>
      <h2>{isLoginMode ? "Log In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLoginMode && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button type="submit">{isLoginMode ? "Login" : "Sign Up"}</button>
      </form>
      {feedback && <p>{feedback}</p>}
      <button onClick={toggleLoginMode}>
        {isLoginMode
          ? "Don't have an account? Sign Up Here"
          : "Already have an account? Log In Here"}
      </button>
    </div>
  );
}
