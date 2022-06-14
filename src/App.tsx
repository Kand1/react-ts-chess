import React, {useEffect, useState} from 'react';
import './App.scss';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {FigureColors, mapColorToNumber} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
    const [board, setBoard] = useState(new Board())
    const [players, setPlayers] = useState(
        [
            new Player(FigureColors.YELLOW),
            new Player(FigureColors.GREEN),
            new Player(FigureColors.RED),
            new Player(FigureColors.BLUE),
        ]
    )
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const restart = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    useEffect(() => {
        restart();
        setCurrentPlayer(players[0]);
    }, [])

    const nextPlayer = () => {
        if (currentPlayer) {
            const playerNumber = mapColorToNumber(currentPlayer.color);
            setCurrentPlayer(playerNumber === 3 ? players[0] : players[playerNumber + 1])
        }
    }

    return (
        <div className="App">
            <LostFigures title="Eaten by Yellow Player" figures={board.eatenFigures[0]}/>
            <LostFigures title="Eaten by Green Player" figures={board.eatenFigures[1]}/>
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <BoardComponent
                board = {board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                nextPlayer={nextPlayer}
            />
            <LostFigures title="Eaten by Red Player" figures={board.eatenFigures[2]}/>
            <LostFigures title="Eaten by Blue Player" figures={board.eatenFigures[3]}/>
        </div>
    );
}

export default App;
