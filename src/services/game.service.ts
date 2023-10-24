import { UUID } from "node:crypto";
import { Server } from "socket.io";
import Tickable from "src/interfaces/tickable.interface";
import Game from "src/logic/game/game.logic";
import Player from "src/logic/players/player.logic";

/**
 * The game service class manages all active game sessions.
 */
export default class GameService implements Tickable {

    /**
     * The Socket IO server instance.
     */
    io: Server;

    /**
     * An array of all game instances.
     */
    games: Map<UUID, Game>;

    /**
     * The game service constructor.
     */
    constructor(io: Server) {
        this.io = io;
        this.games = new Map();
    }

    /**
     * Create a new game instance.
     * 
     * @param player The player instance.
     */
    createGame(player: Player): Game {
        let game: Game = new Game(this.io, player);
        this.games.set(game.uuid, game);
        return game;
    }

    /**
     * Tick all game instances.
     */
    tick(): void {
        this.games.forEach((game: Game) => {
            game.tick();
        });
    }
}