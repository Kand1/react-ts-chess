import {Figure, FigureNames} from "./Figure";
import yellowLogo from "../../assets/yellow-pawn.png"
import greenLogo from "../../assets/green-pawn.png"
import redLogo from "../../assets/red-pawn.png"
import blueLogo from "../../assets/blue-pawn.png";
import {FigureColors, mapColorToDirection, mapColorToLogo} from "../Colors";
import {Cell} from "../Cell";

export class Pawn extends Figure {

    isFirstStep: boolean = true;

    constructor(color: FigureColors, cell: Cell) {
        super(color, cell);
        this.logo = mapColorToLogo(
            color,
            [yellowLogo, greenLogo, redLogo, blueLogo],
        );
        this.name = FigureNames.PAWN;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        const direction = mapColorToDirection(this.color);
        if (direction[0]) {
            //Pawn move
            if ((target.y === this.cell.y + direction[0] || this.isFirstStep
            && (target.y === this.cell.y + direction[0] * 2))
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty()) {
                return true;
            }
            //Pawn attack
            if (target.y === this.cell.y + direction[0]
                && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
                && this.cell.isEnemy(target)) {
                return true;
            }
        } else {
            if ((target.x === this.cell.x + direction[1] || this.isFirstStep
            && (target.x === this.cell.x + direction[1] * 2))
            && target.y === this.cell.y
            && this.cell.board.getCell(target.x, target.y).isEmpty()) {
                return true;
            }
            if (target.x === this.cell.x + direction[1]
                && (target.y === this.cell.y + 1 || target.y === this.cell.y - 1)
                && this.cell.isEnemy(target)) {
                return true;
            }
        }

        return false;
    }

    canAttack(target: Cell): boolean {
        const direction = mapColorToDirection(this.color);
        if (direction[0]) {
            if (target.y === this.cell.y + direction[0]
                && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)) {
                return true;
            }
        } else {
            if (target.x === this.cell.x + direction[1]
                && (target.y === this.cell.y + 1 || target.y === this.cell.y - 1)) {
                return true;
            }
        }
        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}
