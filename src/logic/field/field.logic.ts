import Tickable from "../../interfaces/tickable.interface";
import Grid from "../grid/grid.logic";
import Player from "../players/player.logic";
import { UUID, randomUUID } from "node:crypto";
import { Server } from "socket.io";

/**
 * The field class handles the logic on a single field within a game.
 */
export default class Field implements Tickable {

    // TODO: AN ENTITY MANAGER

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
     * The field grid.
     */
    grid: Grid;

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
        this.grid = new Grid(10, 10);
    }

    /**
     * Tick the field.
     */
    tick(): void {
        console.log('Field Ticked');
        this.io.emit('update', 'Hello player', this.player.uuid);
    }
}