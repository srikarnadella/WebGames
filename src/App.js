import React, { useState } from "react";
import "./App.css";
import TicTacToe from "./TicTacToe";
import RockPaperScissors from "./RockPaperScissors";
import Hangman from "./Hangman";
import Pong from "./Pong";

function App() {
  const [currentGame, setCurrentGame] = useState("ticTacToe");

  const handleGameToggle = (game) => {
    setCurrentGame(game);
  };

  return (
    <div className="app">
      <header className="app-header">
        <nav>
          <button onClick={() => handleGameToggle("ticTacToe")}>
            Tic Tac Toe
          </button>
          <button onClick={() => handleGameToggle("rockPaperScissors")}>
            Rock Paper Scissors
          </button>
        </nav>
      </header>
      <div className="game-container">
        {currentGame === "ticTacToe" && <TicTacToe />}
        {currentGame === "rockPaperScissors" && <RockPaperScissors />}
      </div>
    </div>
  );
}

export default App;
