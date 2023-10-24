import { UUID, randomUUID } from "node:crypto";

/**
 * The player class handles all player-related logic.
 */
export default class Player {

    /**
     * The player uuid.
     */
    uuid: UUID;

    /**
     * The optional game uuid reference.
     */
    gameUuid?: UUID;

    /**
     * The player constructor.
     */
    constructor() {
        this.uuid = randomUUID();
    }
}