import { useState } from 'react'
import './HomePage.scss'

export default function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello</h1>
      <h2>Hello</h2>
      <h3>Hello</h3>
      <h4>Hello</h4>
      <h5>Hello</h5>
      <p>Hello</p>
      <a>Hello</a>
      <div>Hello</div>
      <span>Hello</span>
    </>
  )
}