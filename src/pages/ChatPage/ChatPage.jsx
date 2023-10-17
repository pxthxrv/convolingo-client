import { useState } from "react";
import "./ChatPage.scss";
import ChatComponent from "../../components/Chat/Chat";
import Chat from "../../components/Chat/Chat";
import Dictionary from "../../components/Dictionary/Dictionary";
import Auth from "../../components/Auth/Auth";

export default function HomePage({ user }) {
  const [messages, setMessages] = useState([]);

  return (
    <div className="chat">
      <div className="chat__glass glass">
        <Chat user={user} messages={messages} setMessages={setMessages} />
      </div>
      <Dictionary messages={messages} setMessages={setMessages} /> 
    </div>
  );
}
