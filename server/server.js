const express = require('express');
const fs = require('fs');
const https = require('https');
const socketIo = require('socket.io');
const path = require('path')

const app = express();

//Load SSL certificate and key with correct path
const options={
  key: fs.readFileSync(path.join(__dirname,'certs','localhost+2-key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'certs','localhost+2.pem')),
}

const server = https.createServer(options, app);
const io = socketIo(server, {
  cors: {
    origin: "https://192.168.1.4:4200",
    //origin:"https://127.0.0.1:4200",
    methods: ["GET", "POST"]
  }
});

io.on('connection',(socket)=>{
  console.log('New Client connected');

  socket.on('offer',(offer)=>{
    console.log('Received offer');
    socket.broadcast.emit('offer',offer);
  });

  socket.on('answer',(answer)=>{
    console.log('Received answer');
    socket.broadcast.emit('answer',offer);
  });

  socket.on('candidate',(answer)=>{
    console.log('Received candidate');
    socket.broadcast.emit('candidate',offer);
  });

  socket.on('disconnect',()=>{
    console.log('Client Disconnected');
  });
})


server.listen(3000, () => console.log('Server Running on https://192.168.1.4:3000'));
