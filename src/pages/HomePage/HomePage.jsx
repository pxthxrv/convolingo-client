import { useState } from "react";
import "./HomePage.scss";
import ChatComponent from "../../components/Chat/Chat";
import Chat from "../../components/Chat/Chat";
import Dictionary from "../../components/Dictionary/Dictionary";
import Header from "../../components/Header/Header";

export default function HomePage() {
  const [messages, setMessages] = useState([]);

  return (
    <>
      <Header />
      <div className="glass glass-chat">
        <Chat messages={messages} setMessages={setMessages} />
        <Dictionary messages={messages} setMessages={setMessages} />
      </div>
    </>
  );
}
