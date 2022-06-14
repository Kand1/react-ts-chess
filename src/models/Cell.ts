import {CellColors, FigureColors, mapColorToNumber} from "./Colors";
import {Figure, FigureNames} from "./figures/Figure";
import {Board} from "./Board";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: CellColors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: CellColors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    isEmpty(): boolean {
        return this.figure === null
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure.color
        }
        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let i = min + 1; i < max; i++) {
            if (!this.board.getCell(this.x, i).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false;
        }
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for (let i = min + 1; i < max; i++) {
            if (!this.board.getCell(i, this.y).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if (absY !== absX) {
            return false;
        }
        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isUnderAttack(color: FigureColors) {
        const cells = this.board.cells;
        const tempFigure = this.figure;
        this.figure = null;
        for (let i = 0; i < cells.length; i++) {
            const row = cells[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j]?.figure?.color !== color && row[j]?.figure?.canAttack(this)) {
                    this.figure = tempFigure;
                    return true;
                }
            }
        }
        this.figure = tempFigure;
        return false;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure, playerColor: FigureColors) {
        this.board.eatenFigures[mapColorToNumber(playerColor)].push(figure);
    }

    moveFigure(target: Cell) {
        //Рокировка (castling)
        if (this.figure?.name === FigureNames.KING
            && target.figure?.name === FigureNames.ROOK
            && this.figure.canMove(target)) {
            let newKingPlace: Cell | null = null;
            let newRookPlace: Cell | null = null;
            if (this.y === target.y) {
                const dx = Math.abs(this.x - target.x);
                const direction = this.x < target.x ? 1 : -1;
                newKingPlace = this.board.getCell(this.x + direction * 2, this.y);
                newRookPlace = target.board.getCell( target.x + direction * (1 - dx), target.y)
            } else {
                const dy = Math.abs(this.y - target.y);
                const direction = this.y < target.y ? 1 : -1;
                newKingPlace = this.board.getCell( this.x, this.y + direction * 2);
                newRookPlace = target.board.getCell(target.x, target.y + direction * (1 - dy))
            }
            this.figure.moveFigure(newKingPlace);
            newKingPlace.setFigure(this.figure);
            this.figure = null;

            target.figure.moveFigure(newRookPlace);
            newRookPlace.setFigure(target.figure);
            target.figure = null;
        } else if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            if (target.figure) {
                this.addLostFigure(target.figure, this.figure.color);
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}
