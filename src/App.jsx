import { useState } from 'react'

import "./app.css";
import "./app.scss"




function App() {
  const [count, setCount] = useState(0)
  // state to hold the messages
  // this will be an array of objects with each object containing a message and a sender
const [messages, setMessages] = useState([{
  role: "user",
  content: "What is your name ?"
}, {
  role: "system",
  content: "My name is AI GPT."
}, {
  role: "user",
  content: "Hello How, are you ? "
}, {
  role: "system",
  content: "I am fine, thank you."
}])
  return (

    //making a simple UI for user to interact with
    <main>
<section>

  <div className="conversation-area">
    <div className="messages">

     {
      messages.map((message, index) => {
return (
  <div className={`message ${message.role}`} key={index}>
  {message.content}
</div>

)
      })
     } 
    </div>

    <div className="input-area">
      <input type="text"  placeholder='Ask something'/>
      <button>Send</button>
    </div>

  </div>

</section>

    </main>
  )
}

export default App
