import Tickable from "../../interfaces/tickable.interface";
import EntityManager from "../entities/entity-manager.logic";
import Grid from "../grid/grid.logic";
import Player from "../players/player.logic";
import { UUID, randomUUID } from "node:crypto";
import { Server } from "socket.io";
import { BehaviorSubject } from "rxjs";
import PlayerMatchStats from "tender-core/interfaces/player/player-match-stats.interface";

/**
 * The field class handles the logic on a single field within a game.
 */
export default class Field implements Tickable {

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
     * The match stats.
     */
    matchStats: PlayerMatchStats;

    /**
     * The field grid.
     */
    grid: Grid;

    /**
     * The entity manager.
     */
    entityManager: EntityManager;

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
        this.matchStats = {
            lives: new BehaviorSubject<number>(10),
            eggs: new BehaviorSubject<number>(2),
            feathers: new BehaviorSubject<number>(650),
            income: new BehaviorSubject<number>(250)
        }
        this.grid = new Grid(10, 10);
        this.entityManager = new EntityManager();
    }

    /**
     * Tick the field.
     */
    tick(): void {
        console.log('Field Ticked');
        this.io.emit('update', 'Hello player', this.player.uuid);

        this.entityManager.tick();
    }
}