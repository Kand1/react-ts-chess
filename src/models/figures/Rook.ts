import {Figure, FigureNames} from "./Figure";
import yellowLogo from "../../assets/yellow-rook.png"
import greenLogo from "../../assets/green-rook.png"
import redLogo from "../../assets/red-rook.png"
import blueLogo from "../../assets/blue-rook.png";
import {FigureColors, mapColorToLogo} from "../Colors";
import {Cell} from "../Cell";

export class Rook extends Figure {

    isFirstStep: boolean = true;

    constructor(color: FigureColors, cell: Cell) {
        super(color, cell);
        this.logo = mapColorToLogo(
            color,
            [yellowLogo, greenLogo, redLogo, blueLogo],
        );
        this.name = FigureNames.ROOK;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        if(this.cell.isEmptyVertical(target)) {
            return true;
        }
        if(this.cell.isEmptyHorizontal(target)) {
            return true;
        }
        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}
