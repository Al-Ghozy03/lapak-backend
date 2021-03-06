const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { router } = require("./router/router");
const app = express();
const http = createServer(app);
const io = new Server(http);
require("dotenv").config();
const cors = require("cors");
const { sendNotif, seeNotif } = require("./controller/checkout_controller");
const { seeMessage, sendMessage } = require("./controller/chat_controller");
app.use(cors());
app.use(express.json());
app.use(router);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    seeMessage(data);
    socket.join(data.room_code);
  });
  socket.on("see_notif", (data) => {
    seeNotif(data);
    socket.join(data)
  });

  socket.on("send_message", (data) => {
    sendMessage(data);
    socket.emit("received_message", data);
    socket.to(data.room_code).emit("received_message", data);
  });

  socket.on("send_notif", (data) => {
    sendNotif(data);
    socket.to(data.to).emit("received_notif", data);
  });

  socket.on("received_message", (data) => {
    console.log("diterima", data);
  });
});

http.listen(process.env.PORT);
