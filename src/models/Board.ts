import {Cell} from "./Cell";
import {CellColors, FigureColors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Rook} from "./figures/Rook";
import {Figure} from "./figures/Figure";

export class Board {
    cells: Cell[][] = []
    eatenFigures: Figure[][] =[[],[],[],[]]

    public initCells() {
        this.initFourPlayerCells();
    }

    public initFourPlayerCells() {
        for (let i = 0; i < 14; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 14; j++) {
                if ((i < 3 && j < 3) ||
                    (i < 3 && j > 10) ||
                    (i > 10 && j < 3) ||
                    (i > 10 && j > 10)) {
                    row.push(new Cell(this, j, i, CellColors.INVISIBLE, null));
                } else {
                    if ((i + j) % 2 !== 0) {
                        row.push(new Cell(this, j, i, CellColors.BLACK, null));
                    } else {
                        row.push(new Cell(this, j, i, CellColors.WHITE, null));
                    }
                }
            }
            this.cells.push(row);
        }
    }

    public setAvailableCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getBoardCopy(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.eatenFigures = this.eatenFigures;
        return newBoard;
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(FigureColors.BLUE, this.getCell(1, i + 3))
            new Pawn(FigureColors.GREEN, this.getCell(12, i + 3))
            new Pawn(FigureColors.YELLOW, this.getCell(i + 3, 1))
            new Pawn(FigureColors.RED, this.getCell(i + 3, 12))
        }
    }

    private addKings() {
        new King(FigureColors.BLUE, this.getCell(0, 6))
        new King(FigureColors.GREEN, this.getCell(13, 7))
        new King(FigureColors.YELLOW, this.getCell(6, 0))
        new King(FigureColors.RED, this.getCell(7, 13))
    }

    private addQueens() {
        new Queen(FigureColors.BLUE, this.getCell(0, 7))
        new Queen(FigureColors.GREEN, this.getCell(13, 6))
        new Queen(FigureColors.YELLOW, this.getCell(7, 0))
        new Queen(FigureColors.RED, this.getCell(6, 13))
    }

    private addRooks() {
        new Rook(FigureColors.BLUE, this.getCell(0, 3))
        new Rook(FigureColors.GREEN, this.getCell(13, 3))
        new Rook(FigureColors.YELLOW, this.getCell(10, 0))
        new Rook(FigureColors.RED, this.getCell(3, 13))
        new Rook(FigureColors.BLUE, this.getCell(0, 10))
        new Rook(FigureColors.GREEN, this.getCell(13, 10))
        new Rook(FigureColors.YELLOW, this.getCell(3, 0))
        new Rook(FigureColors.RED, this.getCell(10, 13))
    }

    private addKnights() {
        new Knight(FigureColors.BLUE, this.getCell(0, 4))
        new Knight(FigureColors.GREEN, this.getCell(13, 4))
        new Knight(FigureColors.YELLOW, this.getCell(9, 0))
        new Knight(FigureColors.RED, this.getCell(4, 13))
        new Knight(FigureColors.BLUE, this.getCell(0, 9))
        new Knight(FigureColors.GREEN, this.getCell(13, 9))
        new Knight(FigureColors.YELLOW, this.getCell(4, 0))
        new Knight(FigureColors.RED, this.getCell(9, 13))
    }

    private addBishops() {
        new Bishop(FigureColors.BLUE, this.getCell(0, 8))
        new Bishop(FigureColors.GREEN, this.getCell(13, 5))
        new Bishop(FigureColors.YELLOW, this.getCell(8, 0))
        new Bishop(FigureColors.RED, this.getCell(5, 13))
        new Bishop(FigureColors.BLUE, this.getCell(0, 5))
        new Bishop(FigureColors.GREEN, this.getCell(13, 8))
        new Bishop(FigureColors.YELLOW, this.getCell(5, 0))
        new Bishop(FigureColors.RED, this.getCell(8, 13))
    }

    private addStandardRulesFigures() {
        this.addPawns();
        this.addKings();
        this.addQueens();
        this.addBishops();
        this.addRooks();
        this.addKnights();
    }

    public addFigures() {
        this.addStandardRulesFigures();
    }
}
