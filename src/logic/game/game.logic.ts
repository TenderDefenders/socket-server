import Tickable from "../../interfaces/tickable.interface";
import Field from "../field/field.logic";
import Player from "../players/player.logic";
import { UUID, randomUUID } from "node:crypto";
import { Server } from "socket.io";

/**
 * The game class handles all game logic.
 */
export default class Game implements Tickable {

    /**
     * The socket io server instance.
     */
    io: Server;

    /**
     * The game uuid.
     */
    uuid: UUID;

    /**
     * The field instance.
     */
    field: Field;

    /**
     * The game constructor.
     * 
     * 
     * @param player The player instance.
     */
    constructor(io: Server, player: Player) {
        this.io = io;
        this.uuid = randomUUID();
        this.field = new Field(io, player);
    }

    /**
     * Tick the game.
     */
    tick(): void {
        this.field.tick();
    }

}