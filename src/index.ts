import { createServer } from 'node:http';
import { Server } from 'socket.io';
import GameService from './services/game.service';
import Player from './logic/players/player.logic';
import Game from './logic/game/game.logic';
import GameUpdate from 'tender-core/interfaces/sockets/game-update.interface'

const server = createServer();
const io = new Server(server);

// Game Service
let gameService = new GameService(io);

// On connect
io.on('connection', (socket) => {

  console.log('Connected Socket ID', socket.id);

  // Log to console on user disconnect
  socket.on('disconnect', disconnectReason => {
    console.log('Disconnected Socket ID', socket.id, disconnectReason);
  });

  socket.on('create', () => {
    let player: Player = new Player();
    let game: Game = gameService.createGame(player);
    player.gameUuid = game.uuid;
    socket.emit('created', game);
  });

  socket.on('update', (update: GameUpdate) => {
    // TODO: IMPLEMENT
  });

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
  startTickLoop();
});

/**
 * Start the tick loop.
 */
function startTickLoop() {

  // Run tick loop
  setInterval(() => {

    // Tick the game service
    gameService.tick();

  }, 1_000);
}
