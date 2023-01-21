import React, { useEffect, useState } from 'react';
import Square from './Square';
import './style.css' ;

const TicTacToe = () => {
    let isGameOver = false;
    let statusPlayer;
    let gameStatus;
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const [startGame, setStartGame] = useState(false);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xTurn, setXTurn] = useState(true);
    const [computerPlay, setComputerPlay] = useState(false);
    const [numberOfTurnsLeft, setNumberOfTurnsLeft] = useState(9);
    const winner = calculateWinner(squares);
    winner ? (statusPlayer = winner) : (statusPlayer = 'Player Turn: ' + (xTurn ? 'X' : 'O'));

    const gamePlay = (bool: boolean) => {
        if (bool) {
            setComputerPlay(true);
            setStartGame(true);
        } else if (!bool) {
            setComputerPlay(false);
            setStartGame(true);
        }
    };

    const handleClick = (i: number) => {
        if (isGameOver || squares[i] !== null) return;
        const squaresCopy = [...squares];
        squaresCopy[i] = xTurn ? 'X' : !computerPlay && 'O';
        const newNumberOfTurnsLeft = numberOfTurnsLeft - 1;
        setNumberOfTurnsLeft(newNumberOfTurnsLeft);
        setXTurn(computerPlay ? false : !xTurn);
        setSquares(squaresCopy);
    };

    const playWithComputer = () => {
        if (!computerPlay || isGameOver || xTurn || numberOfTurnsLeft === 0) return;
        const squaresCopy = [...squares];
        const numberOfTurnsLeftCopy = numberOfTurnsLeft - 1;
        const randomIndex = Math.ceil(Math.random() * 9);
        if (squares[randomIndex] === null) {
            squaresCopy[randomIndex] = 'O';
            setSquares(squaresCopy);
            setXTurn(true);
            setNumberOfTurnsLeft(numberOfTurnsLeftCopy);
        } else {
            playWithComputer();
        }
    };

    useEffect(playWithComputer);

    function calculateWinner(squares: number[]) {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                isGameOver = true;
                gameStatus = 'Game Over!';
                return `The winner is: ${squares[a]}`;
            }
        }

        if (numberOfTurnsLeft === 0) {
            isGameOver = true;
            gameStatus = 'Game Over!';
            return 'Tie';
        }

        return null;
    }

    const restartGame = () => {
        setStartGame(false);
        setSquares(Array(9).fill(null));
        setNumberOfTurnsLeft(9);
        setXTurn(true);
        isGameOver = false;
        gameStatus = 'Player Turn: X';
    };

    return (
        <div className="flex justify-center">
          <div className='bg-primary-lighter py-8 px-12 rounded-3xl'>

          
            {!startGame ? (
                <div className="flex flex-col justify-center gap-5 p-8 text-center">
                    <h1 className=' text-3xl mb-4 font-semibold'>Tic Tac Toe</h1>
                    <div className="flex gap-5 sm:flex-row flex-col">
                        <button className="playButton" onClick={() => gamePlay(false)}>
                            Play with Friends
                        </button>
                        <button className="playButton" onClick={() => gamePlay(true)}>
                            Play with Computer
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-5 pb-8">
                    <h3>{statusPlayer}</h3>
                    <div className="board">
                        {squares.map((square, index) => {
                            console.log(square);
                            return <Square value={square} onClick={() => handleClick(index)} key={index} />;
                        })}
                    </div>
                    <h4 className="gameStatus">{gameStatus}</h4>
                    {isGameOver && (
                        <button className="restartGame" onClick={() => restartGame()}>
                            Restart Game
                        </button>
                    )}
                </div>
            )}
            </div>
        </div>
    );
};

export default TicTacToe;
