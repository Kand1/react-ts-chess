import {Figure, FigureNames} from "./Figure";
import yellowLogo from "../../assets/yellow-queen.png"
import greenLogo from "../../assets/green-queen.png"
import redLogo from "../../assets/red-queen.png"
import blueLogo from "../../assets/blue-queen.png";
import {FigureColors, mapColorToLogo} from "../Colors";
import {Cell} from "../Cell";

export class Queen extends Figure {
    constructor(color: FigureColors, cell: Cell) {
        super(color, cell);
        this.logo = mapColorToLogo(
            color,
            [yellowLogo, greenLogo, redLogo, blueLogo],
        );
        this.name = FigureNames.QUEEN;
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
        if(this.cell.isEmptyDiagonal(target)) {
            return true;
        }
        return false;
    }
}
