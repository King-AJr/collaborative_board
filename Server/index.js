const express = require('express');
const cors = require('cors');
const app = express();
const PORT  = process.env.PORT || 5000

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {cors:{
    origin: 'http://localhost:3000',
    AccessControlAllowOrigin: 'http://localhost:3000',
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }});

  let connections = []
  io.on('connect', (socket) => {
      connections.push(socket);
      console.log(`${socket.id} has connected`)
      
      socket.on('draw', (data) => {
          connections.forEach(con => {
              if (con.id !== socket.id) {
                  con.emit('ondraw', data)
              }
          })
      })
      
      socket.on('down', (data) => {
          connections.forEach(con => {
              if (con.id !== socket.id) {
                  con.emit('ondown', {x: data.x, y: data.y})
              }
          })
      })
  })
  
  app.get('/', (req, res) => {
    res.send.json('connected')
  })

httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});

