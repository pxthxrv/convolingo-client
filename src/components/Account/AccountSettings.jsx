import "./AccountSettings.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function AccountSettings() {
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
        console.log(response.data);
        console.log(userId);
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
              <input
                id="username"
                name="username"
                type="text"
                required
                onChange={handleInputChange}
                value={userData.username  || ""}
              />
              <label htmlFor="username">{"USERNAME"}</label>
            </div>

            {/* Email */}
            <div className="question">
              <input
                id="email"
                name="email"
                type="text"
                required
                onChange={handleInputChange}
                value={userData.email  || ""}
              />
              <label htmlFor="email">{"EMAIL"}</label>
            </div>

            {/* First Name */}
            <div className="question">
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                onChange={handleInputChange}
                value={userData.first_name  || ""}
              />
              <label htmlFor="first_name">{"FIRST NAME"}</label>
            </div>

            {/* Last Name */}
            <div className="question">
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                onChange={handleInputChange}
                value={userData.last_name  || ""}
              />
              <label htmlFor="last_name">{"LAST NAME"}</label>
            </div>

            {/* Date of Birth */}
            <div className="question">
              <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                required
                onChange={handleInputChange}
                value={userData.date_of_birth  || ""}
              />
              <label htmlFor="date_of_birth">Date of Birth</label>
            </div>
          </div>

          <div className="form-container__right">
            <div className="question">
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
              <label className="label" htmlFor="native_language">
                SPOKEN LANGUAGE
              </label>
            </div>

            <div className="question">
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
              <label className="label" htmlFor="target_language">
                TARGET LANGUAGE
              </label>
            </div>

            <div className="question">
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
              <label className="label" htmlFor="cefr">
                CEFR LEVEL
              </label>
            </div>

            <div className="question">
              <select
                id="time_per_day"
                name="time_per_day"
                value={userData.time_per_day  || ""}
                onChange={handleInputChange}
                className="input select-item"
              >
                <option value="">Please select</option>
                <option value="20">20 minutes</option>
                <option value="40">40 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
              <label className="label" htmlFor="time_per_day">
                TIME PER DAY
              </label>
            </div>
          </div>

          {/* <label className="label" htmlFor="languageToStudySelect">
          Language to Study
        </label>
        <select
          id="languageToStudySelect"
          name="languageToStudySelect"
          value={selectedLanguageToStudy}
          onChange={handleLanguageToStudyChange}
          className={`input select-item ${
            selectedLanguageToStudyError ? "error" : ""
          }`}
        >
          <option value="">Please select</option>
          {allLanguages.map((language) => (
            <option key={language.id} value={language.display_name}>
              {language.display_name}
            </option>
          ))}
        </select>
        {selectedLanguageToStudyError && (
          <div className="error-message">{selectedLanguageToStudyError}</div>
        )} */}
        </div>

        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
