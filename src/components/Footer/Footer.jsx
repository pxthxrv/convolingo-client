import "./Footer.scss";
import { API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Footer(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(`${API_URL}/auth/logout`)
      .then((response) => {
        if (response.data.message === "Logged out successfully") {
          props.setIsLoggedIn(false);
        //   setUser(null);
        //   setUserId("");
          alert("You have been logged out.");
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.error("Error during logout", error);
      });
  };

  return (
    <div className="footer">
      <button className="btn-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}
