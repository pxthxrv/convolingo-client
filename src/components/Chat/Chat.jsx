import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chat.scss";
import Dictionary from "../Dictionary/Dictionary";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [translationResponse, setTranslationResponse] = useState(null);
  



  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleTranslate = async () => {
    if (!selectedText) return;

    // Copy to clipboard
    await copyToClipboard(selectedText);

    try {
      const response = await axios.post(`${API_URL}/translate/`, {
        vocab: selectedText,
        language: "de", // hardcoded for now
        definition_language: "en-GB",
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



  // auto scroll
  const chatBoxRef = useRef(null);
  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) return;

    const newMessage = {
      preface: "User: ",
      author: "user",
      className: "message__user",
      content: inputValue,
    };
    // Append the user's message to the local state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    const words = ["Apfel", "heute", "morgen", "Geburtstag", "Taschenlampe", "Sonnenbrille"];

    try {
      const response = await axios.post(`${API_URL}/chat/send`, {
        userMessage: inputValue,
        user_id: user.id,
        // language: user.target_language_display, // switch to display_language on the back-end //context or redux // or pass down formatter function as a prop
        language: "German",
        cefrLevel: user.cefr,
        words: words
      });

      const gptMessage = {
        preface: "Chat: ",
        author: "gpt",
        className: "message__gpt",
        content: response.data.gptReply,
      };

      // Append GPT-3's message to the local state
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("Error response:", error.response.data);
    }

    setInputValue(""); // clears when response comes back?
  }

  return (
    <>
      <div className="chat" onMouseUp={handleTextSelection}>
        <div className="chat__glass glass">
          <div className="chat-container">
            <div className="chat-box" ref={chatBoxRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.className}`}
                >
                  {<strong>{message.preface}</strong>}
                  {<span>{message.content}</span>}
                </div>
              ))}
            </div>
            <form className="chat-input" onSubmit={handleSubmit}>
              <input
                className="chat-input__area"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="chat-input__submit" type="submit">
                Send
              </button>
              <button className="chat-input__translate" onClick={handleTranslate}>
                Translate
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="dictionary-container">
        <Dictionary 
                  selectedText={selectedText} 
                  translationResponse={translationResponse}
        />
      </div>
    </>
  );
}
