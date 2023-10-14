import { useState } from 'react'
import './HomePage.scss'
import ChatComponent from '../../components/Chat'
import Chat from '../../components/Chat'
import Dictionary from '../../components/Dictionary/Dictionary'

export default function HomePage() {
  const [messages, setMessages] = useState([]);

  return (
    <>
      <Chat messages={messages} setMessages={setMessages}/>
      <Dictionary messages={messages} setMessages={setMessages}/>
      </>
  )
}