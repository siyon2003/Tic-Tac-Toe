import React from "react";

const GameOver = ({ winner, setGameTurn, setPlayers }) => {
  const handleRestart = () => {
    setGameTurn([]);
    setPlayers({ X: "Player 1", O: "Player 2" });
  };
  return (
    <div id="game-over">
      <h2>Game Over Mankatha da!</h2>
      {winner && <p>{winner.toUpperCase()} has won!!</p>}
      {!winner && <p>It's draw</p>}
      <p>
        <button onClick={handleRestart}>Restart</button>
      </p>
    </div>
  );
};

export default GameOver;
