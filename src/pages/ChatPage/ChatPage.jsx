import { useState } from "react";
// import "./ChatPage.scss";
import Chat from "../../components/Chat/Chat";
// import Dictionary from "../../components/Dictionary/Dictionary";

export default function HomePage({ user }) {
  const [messages, setMessages] = useState([]);

  return (

        <Chat user={user} messages={messages} setMessages={setMessages} />

  );
}
