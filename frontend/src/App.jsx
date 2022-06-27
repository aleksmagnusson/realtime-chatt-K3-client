import { useState, useEffect } from 'react'
import { io } from "socket.io-client"
import './App.css'

let socket;

function App() {
  const [socketId, setSocketId] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  // const [user, setUser] = useState("");

  useEffect(() => {
    socket = io("http://localhost:4000")

    socket.on("connect", () => {
      socket.emit("ready");
      socket.emit("username", "aleks")
    });
  }, []);

  function createRoom() {
    // Använder en prompt/popup ruta.
    const roomName = prompt("Vad vill du namnge rummet?");
    // Socket -global används här.
    socket.emit("create_room", roomName);
    console.log(roomName);
  }

  function handleMessage() {
    socket.emit("message", { message });
  }

  //  function userName() {
  //    socket.emit("user_name", { userName })
  //  }

  function leaveRoom(roomName) {
    socket.emit("leave_room", roomName);
  }

  function joinRoom() {
    // Använder en prompt/popup ruta.
    const roomName = prompt("Vilket room vill du gå med i?");


    socket.emit("join_room", roomName);
    console.log("Du har gått med i rum: " + roomName);
  }



  return (
    <div className="App">

      <header className="App-header">

        <div id='meddelande-container'></div>

        <form onSubmit={(e) => e.preventDefault()}>

          <p>Realtime Chat K3</p>
          <input id='message' type="text" value={message} placeholder="Skriv meddelande..." onChange={(e) => setMessage(e.target.value)} />
          <button type='submit' onClick={() => handleMessage()}>Skicka</button>
          <br />

          <button onClick={() => createRoom("room")}>Skapa rum</button>

          <button onClick={() => joinRoom("room")}>Gå med i rum</button>

          <button onClick={() => leaveRoom("room")}>Lämna rum</button>
        </form>

      </header>

    </div>
  )
}

export default App
