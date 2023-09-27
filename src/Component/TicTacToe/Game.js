import React, { useState, useEffect, useRef } from "react";
import "./Game.css";
import circleICon from "../Assets/circle.png";
import crossIcon from "../Assets/cross.png";

const Game = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [winner, setWinner] = useState(null);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] || winner) {
      return;
    }

    const newBoard = [...board];

    if (count % 2 === 0) {
      newBoard[index] = "x";
    } else {
      newBoard[index] = "O";
    }

    setBoard(newBoard);
    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    if (board[0] === board[1] && board[1] === board[2] && board[2] !== "") {
      setWinner(board[2]);
    } else if (
      board[3] === board[4] &&
      board[4] === board[5] &&
      board[5] !== ""
    ) {
      setWinner(board[5]);
    } else if (
      board[6] === board[7] &&
      board[7] === board[8] &&
      board[8] !== ""
    ) {
      setWinner(board[8]);
    } else if (
      board[0] === board[3] &&
      board[3] === board[6] &&
      board[6] !== ""
    ) {
      setWinner(board[6]);
    } else if (
      board[1] === board[4] &&
      board[4] === board[7] &&
      board[7] !== ""
    ) {
      setWinner(board[7]);
    } else if (
      board[2] === board[5] &&
      board[5] === board[8] &&
      board[8] !== ""
    ) {
      setWinner(board[8]);
    } else if (
      board[0] === board[4] &&
      board[4] === board[8] &&
      board[8] !== ""
    ) {
      setWinner(board[8]);
    } else if (
      board[0] === board[1] &&
      board[1] === board[2] &&
      board[2] !== ""
    ) {
      setWinner(board[2]);
    } else if (
      board[2] === board[4] &&
      board[4] === board[6] &&
      board[6] !== ""
    ) {
      setWinner(board[6]);
    }
  };

  useEffect(() => {
    if (winner) {
      updateTitle();
    }
  }, () => [winner]);

  const updateTitle = () => {
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations! Player: X Won!`;
    } else if (winner === "O") {
      titleRef.current.innerHTML = `Congratulations! Player: O Won!`;
    }
  };

  const resetGame = () => {
    setCount(0);
    setLock(false);
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setWinner(null);
    titleRef.current.innerHTML = "Tic Tac Toe Game In React";
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        {winner
          ? `Congratulations! Player: ${winner} Won!`
          : "Tic Tac Toe Game In React"}
      </h1>
      <div className="board">
        <div className="row1">
          {board.slice(0, 3).map((value, index) => (
            <div
              className="boxes"
              key={index}
              onClick={() => toggle(index)}
            >
              {value === "x" && (
                <img src={crossIcon} alt="Cross Icon" />
              )}
              {value === "O" && (
                <img src={circleICon} alt="Circle Icon" />
              )}
            </div>
          ))}
        </div>
        <div className="row2">
          {board.slice(3, 6).map((value, index) => (
            <div
              className="boxes"
              key={index + 3}
              onClick={() => toggle(index + 3)}
            >
              {value === "x" && (
                <img src={crossIcon} alt="Cross Icon" />
              )}
              {value === "O" && (
                <img src={circleICon} alt="Circle Icon" />
              )}
            </div>
          ))}
        </div>
        <div className="row3">
          {board.slice(6, 9).map((value, index) => (
            <div
              className="boxes"
              key={index + 6}
              onClick={() => toggle(index + 6)}
            >
              {value === "x" && (
                <img src={crossIcon} alt="Cross Icon" />
              )}
              {value === "O" && (
                <img src={circleICon} alt="Circle Icon" />
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default Game;