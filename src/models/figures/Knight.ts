import {Figure, FigureNames} from "./Figure";
import yellowLogo from "../../assets/yellow-knight.png"
import greenLogo from "../../assets/green-knight.png"
import redLogo from "../../assets/red-knight.png"
import blueLogo from "../../assets/blue-knight.png";
import {FigureColors, mapColorToLogo} from "../Colors";
import {Cell} from "../Cell";

export class Knight extends Figure {
    constructor(color: FigureColors, cell: Cell) {
        super(color, cell);
        this.logo = mapColorToLogo(
            color,
            [yellowLogo, greenLogo, redLogo, blueLogo],
        );
        this.name = FigureNames.KNIGHT;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }
}
