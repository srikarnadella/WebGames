import React from "react";

const choices = ["💎", "📄", "✂️"];

class RockPaperScissors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userChoice: null,
      computerChoice: null,
      result: "",
      wins: 0,
      draws: 0,
      losses: 0,
    };
  }

  handleChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;
    if (
      (choice === "💎" && computerChoice === "✂️") ||
      (choice === "📄" && computerChoice === "💎") ||
      (choice === "✂️" && computerChoice === "📄")
    ) {
      result = "You win!";
      this.setState((prevState) => ({
        wins: prevState.wins + 1,
      }));
    } else if (choice === computerChoice) {
      result = "It's a draw!";
      this.setState((prevState) => ({
        draws: prevState.draws + 1,
      }));
    } else {
      result = "Computer wins!";
      this.setState((prevState) => ({
        losses: prevState.losses + 1,
      }));
    }

    this.setState({
      userChoice: choice,
      computerChoice: computerChoice,
      result: result,
    });
  };

  render() {
    const { wins, draws, losses } = this.state;

    return (
      <div className="game">
        <div className="game-board">
          <h2 style={{ fontSize: "3em" }}>Rock Paper Scissors</h2>
          <div className="counter" style={{ fontSize: "1.5em" }}>
            <p>
              Wins🏆: {wins}
              {"      "} Draws: {draws}
              {"      "} Losses❌: {losses}{" "}
            </p>
          </div>
          <div className="choices">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => this.handleChoice(choice)}
                className="choice-button"
              >
                {choice}
              </button>
            ))}
          </div>
          {this.state.userChoice && (
            <div className="result">
              <p>Your choice: {this.state.userChoice}</p>
              <p>Computer's choice: {this.state.computerChoice}</p>
              <p>
                {this.state.userChoice} vs {this.state.computerChoice}
              </p>
              <p>{this.state.result}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RockPaperScissors;
