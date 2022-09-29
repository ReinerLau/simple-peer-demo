/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-09-28 17:25:27
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-09-29 09:31:15
 * @FilePath: \simple-peer-demo\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit("close");
  });
  socket.on("test", (data) => {
    socket.broadcast.emit("test", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
