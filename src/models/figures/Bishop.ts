import {Figure, FigureNames} from "./Figure";
import {FigureColors, mapColorToLogo} from "../Colors";
import {Cell} from "../Cell";
import yellowLogo from "../../assets/yellow-bishop.png"
import greenLogo from "../../assets/green-bishop.png"
import redLogo from "../../assets/red-bishop.png"
import blueLogo from "../../assets/blue-bishop.png";

export class Bishop extends Figure {

    constructor(color: FigureColors, cell: Cell) {
        super(color, cell);
        this.logo = mapColorToLogo(
            color,
            [yellowLogo, greenLogo, redLogo, blueLogo],
        );
        this.name = FigureNames.BISHOP;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        if (this.cell.isEmptyDiagonal(target)) {
            return true;
        }
        return false;
    }
}
