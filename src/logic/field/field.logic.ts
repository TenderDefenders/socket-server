import Tickable from "src/interfaces/tickable.interface";
import Player from "../players/player.logic";
import { UUID, randomUUID } from "node:crypto";
import { Server } from "socket.io";

/**
 * The field class handles the logic on a single field within a game.
 */
export default class Field implements Tickable {

    // TODO: GRID
    // TODO: ARRAY OF TOWERS
    // TODO: ARRAY OF ENEMIES

    /**
     * The socket io server instance.
     */
    io: Server;

    /**
     * The field uuid.
     */
    uuid: UUID;

    /**
     * The player instance.
     */
    player: Player;
    
    /**
     * The field constructor.
     * 
     * @param io The socket io server instance.
     * @param player The player instance.
     */
    constructor(io: Server, player: Player) {
        this.io = io;
        this.uuid = randomUUID();
        this.player = player;
    }

    /**
     * Tick the field.
     */
    tick(): void {
        console.log('Field Ticked');
    }
}