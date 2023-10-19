import { useState } from "react";
import axios from "axios";
import "./Dictionary.scss";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

function Dictionary({ selectedText, translationResponse }) {
  // const [selectedText, setSelectedText] = useState("");
  // const [translationResponse, setTranslationResponse] = useState(null);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  // const handleTranslate = async () => {
  //   if (!selectedText) return;

  //   // Copy to clipboard
  //   await copyToClipboard(selectedText);

  //   try {
  //     const response = await axios.post(`${API_URL}/translate/`, {
  //       vocab: selectedText,
  //       language: "de", // hardcoded for now
  //       definition_language: "en-GB",
  //     });

  //     if (response.data) {
  //       setTranslationResponse(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error translating:", error);
  //   }
  // };

  // const handleTextSelection = () => {
  //   const selected = window.getSelection().toString();
  //   setSelectedText(selected);
  // };

  return (
    <div className="dictionary-container">

      <div className="dictionary glass">
        {translationResponse && (
          <div className="dictionary__response">
            <p className="dictionary__response__item">
              <strong className="dictionary__response__item--strong">
                Original:
              </strong>
              {translationResponse.originalVocab}
            </p>
            <p className="dictionary__response__item">
              <strong className="dictionary__response__item--strong">
                Translation:
              </strong>
              {translationResponse.translation}
            </p>
            <p className="dictionary__response__item">
            </p>
          </div>
        )}
        <button className="dictionary__button">Add to Dictionary</button>
      </div>
    </div>
  );
}

export default Dictionary;
