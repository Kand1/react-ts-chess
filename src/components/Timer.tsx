import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {mapColorToNumber} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const initialTime = 300;
    const [time, setTime] = useState([initialTime, initialTime, initialTime, initialTime])
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    const decrementTimer = () => {
        if (currentPlayer) {
            setTime(prev => {
                let clone = prev.slice(0);
                clone[mapColorToNumber(currentPlayer.color)]--;
                return clone;
            });
        }
    }
    const startTimer = () => {
        if (timer.current) {
            clearInterval(timer.current);
        }
        timer.current = setInterval(decrementTimer, 1000);
    }
    const handleRestart = () => {
        setTime([initialTime, initialTime, initialTime, initialTime]);
        restart();
    }
    useEffect(() => {
        startTimer();
    }, [currentPlayer])
    return (
        <div className="timer">
            <div className="timer__element">
                <div>
                    Yellow time {time[0]}
                </div>
                <div>
                    Green time {time[1]}
                </div>
            </div>
            <div className="timer__turn-info">
                <div>
                    {currentPlayer?.color} player turn
                </div>
                <div>
                    <button onClick={handleRestart}>
                        Restart
                    </button>
                </div>
            </div>
            <div className="timer__element">
                <div>
                    Red time {time[2]}
                </div>
                <div>
                    Blue time {time[3]}
                </div>
            </div>
        </div>
    );
};

export default Timer;
