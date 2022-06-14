import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    nextPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, nextPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const cellClick = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            nextPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure && "cell.figure?.color === currentPlayer?.color") {
                setSelectedCell(cell);
            }
        }
    }
    const updateBoard = () => {
        const newBoard = board.getBoardCopy();
        setBoard(newBoard);
    }
    const setAvailableCells = () => {
        board.setAvailableCells(selectedCell);
        updateBoard();
    }
    useEffect(() => {
        setAvailableCells();
    }, [selectedCell])
    return (
        <>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map((cell, index) =>
                            <CellComponent
                                cell={cell}
                                selected={
                                    cell.x === selectedCell?.x &&
                                    cell.y === selectedCell?.y
                                }
                                cellClick={cellClick}
                                key={cell.id}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </>
    );
};

export default BoardComponent;
