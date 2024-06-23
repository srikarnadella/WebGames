// Hangman.js

import React, { Component } from "react";

class Hangman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordToGuess: "HELLO", // Replace with your word to guess
      guessedLetters: new Set(),
      remainingAttempts: 6, // Number of attempts allowed
      gameStatus: "playing", // "playing", "won", "lost"
    };
  }

  handleGuess = (letter) => {
    const { wordToGuess, guessedLetters, remainingAttempts } = this.state;

    if (!guessedLetters.has(letter)) {
      guessedLetters.add(letter);

      if (!wordToGuess.includes(letter)) {
        this.setState((prevState) => ({
          remainingAttempts: prevState.remainingAttempts - 1,
        }));
      }
    }

    this.checkGameStatus();
  };

  checkGameStatus = () => {
    const { wordToGuess, guessedLetters, remainingAttempts } = this.state;
    const guessedWord = wordToGuess
      .split("")
      .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
      .join("");

    if (guessedWord === wordToGuess) {
      this.setState({ gameStatus: "won" });
    } else if (remainingAttempts === 0) {
      this.setState({ gameStatus: "lost" });
    }
  };

  render() {
    const { wordToGuess, guessedLetters, remainingAttempts, gameStatus } =
      this.state;
    const guessedWord = wordToGuess
      .split("")
      .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
      .join("");

    return (
      <div className="game">
        <div className="game-board">
          <h2 style={{ fontSize: "3em" }}>Hangman</h2>
          <div className="hangman">
            {/* Render hangman graphics or components based on remaining attempts */}
          </div>
          <div className="word-to-guess">
            <p>{guessedWord}</p>
          </div>
          <div className="remaining-attempts">
            <p>Attempts left: {remainingAttempts}</p>
          </div>
          {gameStatus !== "playing" && (
            <div className="game-over">
              <p>{gameStatus === "won" ? "You won!" : "You lost!"}</p>
              {/* Option to play again */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Hangman;
