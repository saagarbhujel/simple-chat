const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

// this will handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("user-message", (message) => {
    // console.log("Message from user", message);
    io.emit("message", { id: socket.id, message: message });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

// this will handle  http request
app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
