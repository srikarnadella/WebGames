// Pong.js

import React, { Component } from "react";

class Pong extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      ballX: 400, // Ball's initial X position
      ballY: 200, // Ball's initial Y position
      ballSpeedX: 5, // Ball's initial X speed
      ballSpeedY: 5, // Ball's initial Y speed
      paddleLeftY: 150, // Left paddle's initial Y position
      paddleRightY: 150, // Right paddle's initial Y position
      scoreLeft: 0, // Left player's score
      scoreRight: 0, // Right player's score
    };

    // Constants
    this.canvasWidth = 800;
    this.canvasHeight = 400;
    this.paddleWidth = 10;
    this.paddleHeight = 80;
    this.paddleSpeed = 10;
    this.ballSize = 20;
  }

  componentDidMount() {
    this.interval = setInterval(this.updateGameArea, 20); // Update game every 20ms
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 87: // W key
        this.movePaddleLeft(-this.paddleSpeed);
        break;
      case 83: // S key
        this.movePaddleLeft(this.paddleSpeed);
        break;
      case 38: // Up arrow key
        this.movePaddleRight(-this.paddleSpeed);
        break;
      case 40: // Down arrow key
        this.movePaddleRight(this.paddleSpeed);
        break;
      default:
        break;
    }
  };

  handleKeyUp = () => {
    // Stop paddles when keys are released
    this.movePaddleLeft(0);
    this.movePaddleRight(0);
  };

  movePaddleLeft = (speed) => {
    this.setState((prevState) => ({
      paddleLeftY: Math.min(
        Math.max(prevState.paddleLeftY + speed, 0),
        this.canvasHeight - this.paddleHeight
      ),
    }));
  };

  movePaddleRight = (speed) => {
    this.setState((prevState) => ({
      paddleRightY: Math.min(
        Math.max(prevState.paddleRightY + speed, 0),
        this.canvasHeight - this.paddleHeight
      ),
    }));
  };

  updateGameArea = () => {
    const {
      ballX,
      ballY,
      ballSpeedX,
      ballSpeedY,
      paddleLeftY,
      paddleRightY,
      scoreLeft,
      scoreRight,
    } = this.state;

    // Move ball
    let newBallX = ballX + ballSpeedX;
    let newBallY = ballY + ballSpeedY;

    // Check collision with top and bottom walls
    if (newBallY <= 0 || newBallY >= this.canvasHeight - this.ballSize) {
      this.setState({ ballSpeedY: -ballSpeedY });
      newBallY = ballY + ballSpeedY;
    }

    // Check collision with left and right paddles
    if (
      (newBallX <= this.paddleWidth &&
        newBallY >= paddleLeftY &&
        newBallY <= paddleLeftY + this.paddleHeight) ||
      (newBallX >= this.canvasWidth - this.paddleWidth - this.ballSize &&
        newBallY >= paddleRightY &&
        newBallY <= paddleRightY + this.paddleHeight)
    ) {
      this.setState({ ballSpeedX: -ballSpeedX });
      newBallX = ballX + ballSpeedX;
    }

    // Check for score
    if (newBallX <= 0) {
      // Right player scores
      this.setState((prevState) => ({
        scoreRight: prevState.scoreRight + 1,
        ballX: this.canvasWidth / 2,
        ballY: this.canvasHeight / 2,
        ballSpeedX: -ballSpeedX,
        ballSpeedY: 5, // Reset ball speed
      }));
    } else if (newBallX >= this.canvasWidth - this.ballSize) {
      // Left player scores
      this.setState((prevState) => ({
        scoreLeft: prevState.scoreLeft + 1,
        ballX: this.canvasWidth / 2,
        ballY: this.canvasHeight / 2,
        ballSpeedX: ballSpeedX,
        ballSpeedY: 5, // Reset ball speed
      }));
    } else {
      this.setState({
        ballX: newBallX,
        ballY: newBallY,
      });
    }
  };

  drawCanvas = () => {
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Draw paddles
    ctx.fillStyle = "#000";
    ctx.fillRect(
      0,
      this.state.paddleLeftY,
      this.paddleWidth,
      this.paddleHeight
    );
    ctx.fillRect(
      this.canvasWidth - this.paddleWidth,
      this.state.paddleRightY,
      this.paddleWidth,
      this.paddleHeight
    );

    // Draw ball
    ctx.beginPath();
    ctx.arc(
      this.state.ballX,
      this.state.ballY,
      this.ballSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#fff";
    ctx.fill();

    // Draw scores
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(`Left Player Score: ${this.state.scoreLeft}`, 20, 30);
    ctx.fillText(
      `Right Player Score: ${this.state.scoreRight}`,
      this.canvasWidth - 180,
      30
    );
  };

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <h2 style={{ fontSize: "3em" }}>Pong</h2>
          <canvas
            ref={(canvas) => {
              this.canvas = canvas;
            }}
            width={this.canvasWidth}
            height={this.canvasHeight}
            style={{ border: "1px solid #000" }}
          />
        </div>
      </div>
    );
  }
}

export default Pong;
