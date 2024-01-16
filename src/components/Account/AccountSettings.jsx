import "./AccountSettings.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function AccountSettings({ setUser }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [allLanguages, setAllLanguages] = useState([]);
  const initialState = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    native_language: "",
    target_language: "",
    time_per_day: "",
    level: "",
    difficulty: "",
    cefr: "",
    // password_hash: '',
  };
  const [userData, setUserData] = useState(initialState);
  
  // Validate Functions
  const validateUsername = (username) => {
    // Make an API Call to see if 
    return username.length >= 3;
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validateString = (string) => {
    return string.length >= 3;
  };

  const validateRequired = (value) => {
    return value.trim() !== '';
  };

  
  // GET EXISTING DATA on USER + fix date
  useEffect(() => {
    axios
      .get(`${API_URL}/user/${userId}`)
      .then((response) => {
        const userDataFromApi = response.data;
        if (userDataFromApi.date_of_birth) {
          // Convert the date to the desired format
          userDataFromApi.date_of_birth = new Date(
            userDataFromApi.date_of_birth
          )
            .toISOString()
            .split("T")[0];
        }
        setUserData(userDataFromApi);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  // GET All languages for dropdown
  useEffect(() => {
    axios
      .get(`${API_URL}/languages`)
      .then((response) => {
        setAllLanguages(response.data);
      })
      .catch(console.error);
  }, []);

  // Handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!validateUsername(userData.username)) {
      alert('Username must be at least 3 characters long and unique.');
      return;
    }
    if (!validateEmail(userData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!validateString(userData.first_name)) {
      alert('First name must be at least 3 characters long.');
      return;
    }
    if (!validateString(userData.last_name)) {
      alert('Last name must be at least 3 characters long.');
      return;
    }
    if (!validateRequired(userData.native_language)) {
      alert('Spoken language is required.');
      return;
    }
    if (!validateRequired(userData.target_language)) {
      alert('Target language is required.');
      return;
    }
    if (!validateRequired(userData.cefr)) {
      alert('CEFR level is required.');
      return;
    }
    if (!validateRequired(userData.time_per_day)) {
      alert('Daily commitment level is required.');
      return;
    }


    // remove id and password from request
    const { password_hash, id, ...dataToSend } = userData;
    // format date
    const formattedDateOfBirth = new Date(userData.date_of_birth)
      .toISOString()
      .split("T")[0];
    const updatedUserData = {
      ...dataToSend,
      date_of_birth: formattedDateOfBirth,
    };
    axios
      .patch(`${API_URL}/user/update/${userId}`, updatedUserData)
      .then((response) => {
        console.log("Success:", response.data.message);

        // added this line
        return axios.get(`${API_URL}/user/${userId}`);
        // navigate(`/home/${userId}`);
      })
      .then((response) => {
        const updatedUserData = response.data;
        setUser(updatedUserData);
        navigate(`/home/${userId}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Account Settings</h1>
        <div className="form-container">
          <div className="form-container__left">
            {/* Username */}
            <div className="question">
              <label className="label" htmlFor="username">{"USERNAME"}</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                onChange={handleInputChange}
                value={userData.username || ""}
                className="input input-text"
              />
            </div>

            {/* Email */}
            <div className="question">
              <label className="label" htmlFor="email">{"EMAIL"}</label>
              <input
                id="email"
                name="email"
                type="text"
                required
                onChange={handleInputChange}
                value={userData.email || ""}
                className="input input-text"
              />
            </div>

            {/* First Name */}
            <div className="question">
              <label className="label" htmlFor="first_name">{"FIRST NAME"}</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                onChange={handleInputChange}
                value={userData.first_name || ""}
                className="input input-text"
              />
            </div>

            {/* Last Name */}
            <div className="question">
              <label className="label" htmlFor="last_name">{"LAST NAME"}</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                onChange={handleInputChange}
                value={userData.last_name || ""}
                className="input input-text"
              />
            </div>

            {/* Date of Birth */}
            <div className="question">
              <label className="label" htmlFor="date_of_birth">DATE OF BIRTH</label>
              <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                required
                onChange={handleInputChange}
                value={userData.date_of_birth || ""}
                className="input select-date"
              />
            </div>
          </div>

          <div className="form-container__right">
          
            <div className="question">
            <label className="label" htmlFor="native_language">
              SPOKEN LANGUAGE
            </label>
              <select
                id="native_language"
                name="native_language"
                value={userData.native_language || ""}
                onChange={handleInputChange}
                className="input select-item"
              >
                <option value="">Please select</option>
                {allLanguages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.display_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="question">
              <label className="label" htmlFor="target_language">
                TARGET LANGUAGE
              </label>
              <select
                id="target_language"
                name="target_language"
                value={userData.target_language || ""}
                onChange={handleInputChange}
                className="input select-item"
              >
                <option value="">Please select</option>
                {allLanguages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.display_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="question">
              <label className="label" htmlFor="cefr">
                CEFR LEVEL
              </label>
              <select
                id="cefr"
                name="cefr"
                value={userData.cefr || ""}
                onChange={handleInputChange}
                className="input select-item"
              >
                <option value="">Please select</option>
                {[
                  "A1.1",
                  "A1.2",
                  "A2.1",
                  "A2.2",
                  "B1.1",
                  "B1.2",
                  "B2.1",
                  "B2.2",
                  "C1.1",
                  "C1.2",
                  "C2.1",
                  "C2.2",
                ].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="question">
              <label className="label" htmlFor="time_per_day">
                DAILY COMMITMENT
              </label>
              <select
                id="time_per_day"
                name="time_per_day"
                value={userData.time_per_day || ""}
                onChange={handleInputChange}
                className="input select-item"
              >
                <option value="">Please select</option>
                <option value="20">20 minutes</option>
                <option value="40">40 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>

              <button className="btn-submit" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
