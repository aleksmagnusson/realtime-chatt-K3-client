const express = require("express");
const app = express();
const port = 4000;
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

// Lägg till cors med socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = {
  default: {
    name: "Default room",
    state: [],
  },
};

const username = {
  default: {
    name: "Default user",
    state: [],
  },
};

// socket connection / anslutning.
io.on("connection", (socket) => {
  console.log(`Socket med id ${socket.id} har anslutit`);

  // socket.io | socket.join room
  socket.on("join_room", (data) => {
    socket.join(rooms);
    console.log(`User ${username.data} har gått med i rum: ${data.room}`);
    console.log(socket.username);
  });

  // socket.io | socket.leave room.
  socket.on("leave_room", (data) => {
    socket.leave(username.room);
    console.log(`User: ${username.data} har lämnat rum: ${data.room}`);
  });

  // Användare och användarnamn.
  socket.on("username", (username) => {
    socket.username = username;
  });

  socket.on("message", (data) => {
    console.log(
      `User: ${username.data} har skickat meddelande: ${data.message}`
    );
    socket.broadcast.emit("message", data);
    console.log(data);
  });

  // socket.io | disconnect / avbryter.
  socket.on("disconnect", (reason) => {
    console.log(
      `Socket ${socket.id} avbröts / har lämnat. Anledning: ${reason}`
    );
  });

  // Skapa rum med hjälp av socket.on.
  socket.on("create_room", (room) => {
    rooms[room] = {
      name: room,
      state: room,
    };

    console.log(rooms);
  });

  // Event: "update" uppdatera data till det nya rummet.
  socket.on("update", (rooms) => {
    const joinedRooms = Array.from(socket.rooms);
    const currentRoom = joinedRooms[1];
    const currentState = rooms[currentRoom].state;

    io.emit(currentRoom).emit("updated_state", state);
  });
});

io.listen(4000);
console.log("Servern körs på port 4000, tryck CTRL + C för att avsluta.");

io.to("default").emit("new_message", {
  id: "1",
  message: "hej",
  to: "default",
});
