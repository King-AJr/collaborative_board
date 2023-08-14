const express = require('express');
const cors = require('cors');
const app = express();
const PORT  = process.env.PORT || 5000

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {cors:{
    origin: 'http://localhost:3000',
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }});

io.on("connection", (socket) => {
    console.log('A user connected');
});

httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});

