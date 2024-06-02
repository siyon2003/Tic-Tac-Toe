import React from "react";

const GameOver = ({ winner, setGameTurn }) => {
  const handleRestart = () => {
    setGameTurn([]);
  };
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner.toUpperCase()} has won!!</p>}
      {!winner && <p>It's draw</p>}
      <p>
        <button onClick={handleRestart}>Restart</button>
      </p>
    </div>
  );
};

export default GameOver;
