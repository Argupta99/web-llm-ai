import { use, useState, useEffect } from 'react'

import * as webllm from "@mlc-ai/web-llm";
import "./app.css";
import "./app.scss";




function App() {
  const [count, setCount] = useState(0)
  const[inputValue, setInputValue] = useState("")
  // state to hold the messages
  // this will be an array of objects with each object containing a message and a sender
const [messages, setMessages] = useState([{
   role: "system",
    content: "You are ChatGPT, an advanced AI assistant that is friendly, helpful, and conversational. Respond clearly and helpfully to user queries."
  }
  

  ])

//creating state variable to hold the engine
// this will be used to interact with the web-llm engine
const [engine, setEngine] = useState(null)

//loading the engine on useEffect 
//downloading model is a asynchronous task
//An asynchronous task, or "async task", is a task that can run independently of other tasks without blocking the main program's execution. It allows a program to perform multiple tasks concurrently, improving responsiveness and efficiency.

useEffect(() => {
  const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
//creating a new engine instance
//MLC Engine needs two things--selected model and a progress callback function
//the initProgressCallback function will be called with the progress of the engine initialization and will update the UI accordingly
webllm.CreateMLCEngine(selectedModel, {
  initProgressCallback: (initProgress) => {
    console.log("initProgress", initProgress);
  }

})

.then (engine => {
  setEngine(engine);
})
  
}, []);



async function sendMessageToLlm() {
  if (!engine) {
    console.warn("Engine not ready yet.");
    return;
  }

  const tempMessages = [...messages];
  tempMessages.push({
    role: "user",
    content: inputValue,
  });

  setMessages(tempMessages);
  setInputValue("");

  
    engine.chat.completions.create({
      messages: tempMessages, // Use updated message list
    }).then((reply) => {

    console.log("reply", reply);
    const text = reply.choices[0].message.content;

    // Add the assistant's reply to the message list
    setMessages([...tempMessages, {
      role: "assistant",
      content: text
    }]);

    })


  }




  return (

    //making a simple UI for user to interact with
    <main>
<section>

  <div className="conversation-area">
    <div className="messages">

     {
      messages.filter(message=>message.role!=="system").map((message, index) => {
return (
  <div className={`message ${message.role}`} key={index}>
  {message.content}
</div>

)
      })
     } 
    </div>

    <div className="input-area">
      <input 
      onChange={(e) => {
        setInputValue(e.target.value)
      }
    }

    value={inputValue}
    onKeyDown = {(e) => {
      if (e.key === 'Enter') {
        // Call the function to send the message
        sendMessageToLlm();
      }
    }}
      type="text"  placeholder='Ask something'/>
      <button
      
      onClick={() => {
        // Call the function to send the message
        sendMessageToLlm();
      }}
      >Send</button>
    </div>

  </div>

</section>

    </main>
  )
}

export default App
