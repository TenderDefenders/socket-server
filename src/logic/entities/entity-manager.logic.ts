import Tickable from "src/interfaces/tickable.interface";
import Enemy from "./enemies/enemy.logic";
import Tower from "./towers/tower.logic";

/**
 * The entity manager caches all towers and enemies.
 */
export default class EntityManager implements Tickable {

    /**
     * The towers.
     */
    towers: Tower[];

    /**
     * The enemies.
     */
    enemies: Enemy[];

    /**
     * Construct the entity manager.
     */
    constructor() {
        this.towers = [];
        this.enemies = [];
    }

    /**
     * Tick the entity manager.
     */
    tick() {
        // Tick all entities
        this.towers.forEach(tower => tower.tick());
        this.enemies.forEach(enemy => enemy.tick());
    }
}