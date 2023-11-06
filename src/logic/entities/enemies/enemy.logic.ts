import Tickable from "src/interfaces/tickable.interface";
import Field from "src/logic/field/field.logic";
import EnemyAttributes from "tender-core/interfaces/enemies/enemy-attributes.interface"
import DamageResult from "tender-core/interfaces/enemies/damage-result.interface"

/**
 * This class handles all of the logic for an enemy.
 */
export default class Enemy implements Tickable {

    /**
     * The field the enemy is on.
     */
    field: Field;

    /**
     * The enemy attributes.
     */
    attributes: EnemyAttributes;

    /**
     * The enemy constructor.
     */
    constructor(field: Field, attributes: EnemyAttributes) {
        this.field = field;
        this.attributes = attributes;
    }

    /**
     * Place the enemy on the field.
     */
    place() {
        // TODO: Place the enemy on the field, follow path defined in field
    }

    /**
     * Damage the chicken.
     * 
     * @param damage the damage to be dealt
     * @returns finalDamage: the final damage dealt to the chicken, isKilled: true if the chicken is killed, false otherwise
     */
    damage(damage: number): DamageResult {

        // Call on damage to get the final damage amount
        damage = this.preDamage(damage);

        // Make sure damage does not exceed chicken health,
        // ensures stats are calcualted correctly
        if (this.attributes.health - damage < 0) {
            damage = this.attributes.health;
        }

        // Subtract health
        this.attributes.health -= damage;

        // Check if chicken is dead
        if (this.attributes.health <= 0) {
            // Destroy chicken
            this.destroy();

            // Add feathers to player
            let stats = this.field.matchStats;
            stats.feathers.next(stats.feathers.getValue() + this.attributes.payout);
        }

        // Call on damage
        this.onDamage(damage);

        // Return damage
        return {
            damage: damage,
            isKilled: this.attributes.health <= 0
        };
    }

    /**
     * Called before damage is dealt to the enemy.
     * 
     * @param damage the damage to be dealt to the enemy
     * @returns 
     */
    preDamage(damage: number): number {
        return damage;
    }

    /**
     * Called when an enemy is damaged.
     * 
     * @param damage the final damage dealt to the enemy
     */
    onDamage(damage: number): number {
        return damage;
    }

    /**
     * Destroy the enemy.
     */
    destroy() {
        // TODO: IMPLEMENT
    }

    /**
     * Check if the enemy is dead.
     * 
     * @returns true if the enemy is dead, false otherwise
     */
    isDead() {
        return this.attributes.health <= 0;
    }

    /**
     * Tick the enemy.
     */
    tick(): void {
    }
}