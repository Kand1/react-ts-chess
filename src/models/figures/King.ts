import {Figure, FigureNames} from "./Figure";
import yellowLogo from "../../assets/yellow-king.png"
import greenLogo from "../../assets/green-king.png"
import redLogo from "../../assets/red-king.png"
import blueLogo from "../../assets/blue-king.png";
import {FigureColors, mapColorToLogo} from "../Colors";
import {Cell} from "../Cell";

export class King extends Figure {

    isFirstStep: boolean = true;

    constructor(color: FigureColors, cell: Cell) {
        super(color, cell);
        this.logo = mapColorToLogo(
            color,
            [yellowLogo, greenLogo, redLogo, blueLogo],
        );
        this.name = FigureNames.KING;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        if (Math.abs(target.x - this.cell.x) <= 1
            && Math.abs(target.y - this.cell.y) <= 1) {
            this.cell.figure = null;
            if (target.isUnderAttack(this.color)) {
                this.cell.figure = this;
                return false;
            }
            this.cell.figure = this;
            return true;
        }
        if (target.figure?.name === FigureNames.ROOK
            && target.figure?.isFirstStep && this.isFirstStep
            && (this.cell.isEmptyVertical(target)
            || this.cell.isEmptyHorizontal(target))) {
            return true;
        }
        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}
