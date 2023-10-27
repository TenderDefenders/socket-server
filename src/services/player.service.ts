import { UUID } from "node:crypto";
import Tickable from "../interfaces/tickable.interface";
import Player from "../logic/players/player.logic";

/**
 * The player service class manages all active player sessions.
 */
export default class PlayerService implements Tickable {

    /**
     * The players array.
     */
    players: Map<UUID, Player> = new Map();

    /**
     * The player service constructor.
     */
    constructor() {
        /**
         * An array of all player instances.
         */
        this.players = new Map();
    }

    /**
     * Create a new player instance.
     */
    createPlayer() {
        let player = new Player();
        this.players.set(player.uuid, player);
        return player;
    }

    /**
     * Tick all player instances.
     */
    tick() {
        console.log('TODO');
    }
}
