import React, { useState } from "react";

function GameBoard({ onhandlePlayer, board }) {
  return (
    <div>
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => onhandlePlayer(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default GameBoard;
