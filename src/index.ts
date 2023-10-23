import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import SocketClientRequest from './interfaces/socket-client-request';
import Queue from 'tender-core/utils/queue.utils';

const app = express();
const server = createServer(app);
const io = new Server(server);
const queue = new Queue<SocketClientRequest>();

app.get('/', (req, res) => {
  res.sendFile("C:/Development/TD/socket-client/public/index.html");
});

// Log of history
let history: object[] = []

// On connect
io.on('connection', (socket) => {

  console.log('Socket ID', socket.id);

  // Broadcast chat history to client on connect
  for (let msg of history) {
    socket.emit('chat message', msg);
  }

  // Emit a user connected
  cacheAndEmit({ clientId: -1, content: 'a user connected to the chat' })

  // Log to console on user disconnect
  socket.on('disconnect', disconnectReason => {
    cacheAndEmit({ clientId: -1, content: 'a user disconnected from the chat' });
  });

  // On message received, relay to all connections
  socket.on('chat message', msg => cacheAndEmit(msg));

  // On input received, queue it up
  socket.on('input', input => {

    // Create the req
    let req: SocketClientRequest = {
      timestamp: new Date().getTime(),
      socketId: socket.id,
      request: input,
    }

    // Push the request to the queue
    queue.enqueue(req);
  });
});

/**
 * Cache a message to history & notify all connections
 * of the message.
 * 
 * @param message the message to cache and emit
 */
function cacheAndEmit(message: object) {
  history.push(message);
  io.emit('chat message', message);
}

// Start & listen to server
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');

  // Run health check
  let x = 0;
  setInterval(() => {
    if (server.listening) {
      let requests = queue.dequeueAll();
      console.log(requests);
      // io.emit('health', ++x);
      // console.log('Logging', queue.length());
    }
  }, 1_000); // 5 secs for testing purposes
});
