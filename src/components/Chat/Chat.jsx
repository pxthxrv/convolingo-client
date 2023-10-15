import { useState } from 'react';
import axios from 'axios';
import "./Chat.scss"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [userId, setUserId] = useState(1); // A hardcoded user_id for this example
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      if (!inputValue) return;
  
      const newMessage = {
        preface: 'User: ',
        author: 'user',
        className: 'message__user',
        content: inputValue,
      };
  
      // Append the user's message to the local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  
      try {
        const response = await axios.post(`${API_URL}/chat/send`, {
          userMessage: inputValue,
          user_id: userId,
        });
  
        const gptMessage = {
          preface: 'Chat: ',
          author: 'gpt',
          className: 'message__user',
          content: response.data.gptReply,
        };
  
        // Append GPT-3's message to the local state
        setMessages((prevMessages) => [...prevMessages, gptMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
  
      // Clear input field
      setInputValue("");
    }

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.className}`}>
                        {<strong>{message.preface}</strong>}
                        {<span>{message.content}</span>}
                        
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    className="chat"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}