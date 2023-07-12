import express, { Request, Response } from 'express';
const app = express();

import http from 'http';
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server);

// Get request to server
app.get('/', (req: Request, res: Response) => {
    res.send('Socket.IO Server');
});

// io on connection
io.on('connection', (socket) => {
    console.log('a user connected');
});

// Start the server
app.listen(3000, () => {
    console.log('Application started on port 3000!');
});