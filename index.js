const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.get('/', (req, res) => {
  res.render('home')
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("user-message", (message) => {
        // Emit the message along with sender information
        io.emit("message", { text: message.text, sender: message.sender });
    });
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});