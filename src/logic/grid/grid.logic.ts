import TileProperties from 'tender-core/interfaces/tiles/tile-properties.interface';

/**
 * The 2D grid class.
 */
export default class Grid {

    /**
     * The number of rows.
     */
    rows: number;

    /**
     * The number of columns.
     */
    cols: number;

    /**
     * The 2d array.
     */
    array: TileProperties[][] = [];

    /**
     * The grid constructor.
     * 
     * @param rows The number of rows.
     * @param cols The number of columns.
     */
    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;

        // Populate the array
        for (let i = 0; i < this.rows; i++) {
            this.array[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.array[i][j] = {
                    row: i,
                    col: j,
                    tower: null,
                    isPath: false
                };
            }
        }
    }

    /**
     * Get a tile by row and column.
     * 
     * @param row The row.
     * @param col The column.
     */
    getTile(row: number, col: number): TileProperties {
        return this.array[row][col];
    }
}