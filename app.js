const http = require('http');
const socketIO = require('socket.io');

const app = http.createServer((req, res) => {
  res.write('<h1>Hello</h1>');
  res.end();
});

app.listen(80, () => {
  console.log('server listening on port 80');
});

const io = socketIO(app);
const log = (data) => console.log(data);

let initiator = {};
let peer = {};

io.on('connection', (socket) => {
  socket.emit('hi', { message: 'hello!' });

  socket.on('signal', (msg) => {
    socket.emit('hi', 'no mam date');
  });

  socket.on('setInitiator', (data) => {
    initiator = data;
    socket.broadcast.emit('initiatorSet', data);
    log('setInitiator');
  });

  socket.on('getInitiator', () => {
    socket.emit('initiator', initiator);
    log('getInitiator');
  });

  socket.on('setPeer', (data) => {
    peer = data;
    socket.broadcast.emit('peerSet', data);
    log('setPeer');
  })

  socket.on('getPeer', () => {
    socket.emit('peer', peer);
    log('getPeer');
  })
})