const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { router } = require("./router/router");
const app = express();
const http = createServer(app);
const io = new Server(http);
const dotenv = require("dotenv").config();
const cors = require("cors");
const { sendNotif } = require("./controller/barang_controller");

app.use(cors());
app.use(express.json());
app.use(router);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send_notif", (data) => {
    console.log(data);
    sendNotif(data);
    socket.to(data.to).emit("received_notif");
  });
});

http.listen(process.env.PORT);
