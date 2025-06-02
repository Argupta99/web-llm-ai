import { useState } from 'react'
import "./app.css";
import "./app.scss"



function App() {
  const [count, setCount] = useState(0)

  return (

    //making a simple UI for user to interact with
    <main>
<section>

  <div className="conversation-area">

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
