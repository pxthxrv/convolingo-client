import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AccountSettings.scss"; // Import the CSS. Rename 'YourCSSFileName.css' to your actual CSS filename.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function AccountSettings() {
  const { UserId } = useParams();
  const navigate = useNavigate();

  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState("");
  const [selectedLanguageToStudy, setSelectedLanguageToStudy] = useState("");

  const [selectedSpokenLanguageError, setSelectedSpokenLanguageError] =
    useState(null);
  const [selectedLanguageToStudyError, setSelectedLanguageToStudyError] =
    useState(null);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    spokenLanguage: "",
    languageToStudy: "",
  });

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


  const handleSpokenLanguageChange = (e) => {
    console.log("Selected spoken language:", e.target.value);
    setSelectedSpokenLanguage(e.target.value);
    // if (e.target.value) {
    //   setSelectedSpokenLanguageError(null);
    // } else {
    //   setSelectedSpokenLanguageError("Please select a spoken language.");
    // }
  };
  const handleLanguageToStudyChange = (e) => {
    console.log("Selected language to study:", e.target.value);
    setSelectedLanguageToStudy(e.target.value);
    // if (e.target.value) {
    //   setSelectedLanguageToStudyError(null);
    // } else {
    //   setSelectedLanguageToStudyError("Please select a language to study.");
    // }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const transformDataForSubmission = (data) => {
    return {
      first_name: data.firstname,
      last_name: data.lastname,
      date_of_birth: data.dob,
      native_language: data.languageToStudy,
      target_language: data.languageToStudy,
      difficulty: data.difficulty,
      email: data.email, 
    };
  };

  const submitPreferences = async (values) => {

    const transformedData = transformDataForSubmission(values);

    try {
      const response = await axios.post(
        `${API_URL}/user/update/${UserId}`,
        // userData
        console.log("Transformed Data being sent:", transformedData)
      );

      if (response.status === 200) {
        // Maybe store the updated user data in the app's state
        navigate(`/home/${UserId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      spokenLanguage: "",
      languageToStudy: "",
      difficulty: "",
    },
    onSubmit: (values) => {
      
      submitPreferences(values).then(() => {
        // navigate(`/home/${UserId}`);
        console.log(values);
      });
    },
  });

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
