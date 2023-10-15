import "./AccountSettings.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate,  } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function AccountSettings() {
  // const { UserId } = useParams();
  const { id: userId } = useParams();
  const navigate = useNavigate();
  // const [allLanguages, setAllLanguages] = useState([]);
  // const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState("");
  // const [selectedLanguageToStudy, setSelectedLanguageToStudy] = useState("");
  const initialState = {
    // id: '',
    username: '',
    email: '',
    // password_hash: '',
    // signup_date: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    native_language: '',
    target_language: '',
    time_per_day: '',
    level: '',
    difficulty: '',
    cefr: ''
  };

  const [userData, setUserData] = useState(initialState);

  
  // GET EXISTING DATA on USER
  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`).then(response => {
      setUserData(response.data);
    });
  }, [userId]);


  // GET All languages for dropdown
  useEffect(() => {
    axios
      .get(`${API_URL}/languages`)
      .then((response) => {
        setAllLanguages(response.data);
        console.log(response.data);
        console.log(UserId)
      })
      .catch(console.error);
  }, []);

  // const handleSpokenLanguageChange = (e) => {
  //   console.log("Selected spoken language:", e.target.value);
  //   setSelectedSpokenLanguage(e.target.value);
  //   // if (e.target.value) {
  //   //   setSelectedSpokenLanguageError(null);
  //   // } else {
  //   //   setSelectedSpokenLanguageError("Please select a spoken language.");
  //   // }
  // };
  // const handleLanguageToStudyChange = (e) => {
  //   console.log("Selected language to study:", e.target.value);
  //   setSelectedLanguageToStudy(e.target.value);
  //   // if (e.target.value) {
  //   //   setSelectedLanguageToStudyError(null);
  //   // } else {
  //   //   setSelectedLanguageToStudyError("Please select a language to study.");
  //   // }
  // };

  // Handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  // SUBMIT 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${API_URL}/user/update/${userId}`, userData).then((response) => {
      console.log("Data being sent:", response.data)
      // Handle successful update here (e.g. show a success message)
    }).catch(error => {
      console.error("Error:", error);
    });
  };


  // const formik = useFormik({
  //   initialValues: {
  //     firstname: "",
  //     lastname: "",
  //     email: "",
  //     dob: "",
  //     spokenLanguage: "",
  //     languageToStudy: "",
  //     difficulty: "",
  //   },
  //   onSubmit: (values) => {
      
  //     submitPreferences(values).then(() => {
  //       // navigate(`/home/${UserId}`);
  //       console.log(values);
  //     });
  //   },
  // });

  return (
    <div className="page">
      <form
        onSubmit={formik.handleSubmit}
      >
        <h1>Account Settings</h1>

        {["firstname", "lastname", "email"].map((name) => (
          <div key={name} className="question">
            <input
              id={name}
              name={name}
              type="text"
              required
              onChange={formik.handleChange}
              value={formik.values[name]}
            />
            <label htmlFor={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
          </div>
        ))}

        <div className="question">
          <input
            id="dob"
            name="dob"
            type="date"
            required
            onChange={formik.handleChange}
            value={formik.values.dob}
          />
          <label htmlFor="dob">Date of Birth</label>
        </div>

        {/* Spoken Language */}
        <label className="label" htmlFor="spokenLanguageSelect">
          Spoken Language
        </label>
        <select
          id="spokenLanguageSelect"
          name="spokenLanguageSelect"
          // value={selectedSpokenLanguage}
          value={formik.values.spokenLanguage}
          onChange={handleSpokenLanguageChange} // you should have this function to handle the change
          className={`input select-item ${
            selectedSpokenLanguageError ? "error" : ""
          }`}
        >
          <option value="">Please select</option>
          {allLanguages.map((language) => (
            <option key={language.id} value={language.display_name}>
              {language.display_name}
            </option>
          ))}
        </select>
        {selectedSpokenLanguageError && (
          <div className="error-message">{selectedSpokenLanguageError}</div>
        )}

        <label className="label" htmlFor="languageToStudySelect">
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
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
