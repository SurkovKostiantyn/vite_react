import { useState } from 'react';
import Board from './Game/Board.jsx';
import './Game/Game.css';

function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
        const squaresCopy = squares.slice();
        if (calculateWinner(squaresCopy) || squaresCopy[i]) {
            return;
        }
        squaresCopy[i] = xIsNext ? 'X' : 'O';
        setSquares(squaresCopy);
        setXIsNext(!xIsNext);
    };

    const winner = calculateWinner(squares);
    const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={squares} onClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{status}</div>
            </div>
        </div>
    );
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
    // Логіка для визначення переможця
    // ...
}

export default Game;
