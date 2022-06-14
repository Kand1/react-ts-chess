import {FigureColors} from "../Colors";
import logo from '../../assets/blue-bishop.png'
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = "FIGURE",
    KING = "KING",
    KNIGHT = "KNIGHT",
    PAWN = "PAWN",
    QUEEN = "QUEEN",
    ROOK = "ROOK",
    BISHOP = "BISHOP",
}

export  class Figure {
    color: FigureColors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    isFirstStep: boolean;
    id: number;

    constructor(color: FigureColors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.isFirstStep = true;
        this.id = Math.random();
    }

    canMove(target: Cell, checkKingMove?: boolean): boolean {
        if (target.figure?.color === this.color
            && this.name === FigureNames.KING
            && target.figure.name === FigureNames.ROOK
            && target.figure.isFirstStep && this.isFirstStep) {
            return true;
        }
        if (target.figure?.color === this.color) {
            return false;
        }
        if (target.figure?.name === FigureNames.KING) {
            return false;
        }
        return true;
    }

    canAttack(target: Cell): boolean {
        return this.canMove(target);
    }

    moveFigure(target: Cell) {}
}
