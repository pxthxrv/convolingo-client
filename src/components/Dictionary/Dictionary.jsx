import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

function Dictionary() {
  const [selectedText, setSelectedText] = useState("");
  const [translationResponse, setTranslationResponse] = useState(null);

  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  const handleTranslate = async () => {
    if (!selectedText) return;

    // Copy to clipboard
    await copyToClipboard(selectedText);

    try {
      const response = await axios.post(`${API_URL}/translate/`, {
        vocab: selectedText,
        language: "de",  // hardcoded for now
        definition_language: "en-GB"
      });

      if (response.data) {
        setTranslationResponse(response.data);
      }
    } catch (error) {
      console.error("Error translating:", error);
    }
  };

  const handleTextSelection = () => {
    const selected = window.getSelection().toString();
    setSelectedText(selected);
  };

  return (
    <div className="dictionary" onMouseUp={handleTextSelection}>
      <button onClick={handleTranslate}>Translate Selected Text</button>
      
      {translationResponse && (
        <div className="translation-response">
          <p><strong>Original:</strong> {translationResponse.originalVocab}</p>
          <p><strong>Translation:</strong> {translationResponse.translation}</p>
          <p><strong>Translation Record ID:</strong> {translationResponse.translationRecord}</p>
        </div>
      )}
    </div>
  );
}

export default Dictionary;