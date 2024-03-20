const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`Socket Connected id=${socket.id}`);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userId, offer, senderName }) => {
    io.to(userId).emit("callUser", {
      offer,
      from: socket.id,
      senderName,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.answer);
  });
});

server.listen(5000, () => {
  console.log("Server Listen on PORT 5000....");
});
