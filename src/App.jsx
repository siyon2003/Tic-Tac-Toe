import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveGameBoard = (gameTurn) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  for (let turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveWinner = (gameBoard, players) => {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    let firstSymbol = gameBoard[combination[0].row][combination[0].col];
    let secondSymbol = gameBoard[combination[1].row][combination[1].col];
    let thirdSymbol = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  return winner;
};

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  let activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurn.length === 9 && !winner;
  const handleGameTurnChange = (rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      let activePlayer = deriveActivePlayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  };
  const handleChangePlayer = (symbol, playerName) => {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: playerName,
      };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            handleChangePlayer={handleChangePlayer}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            handleChangePlayer={handleChangePlayer}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} setGameTurn={setGameTurn} setPlayers={setPlayers}/>
        )}
        <GameBoard onhandlePlayer={handleGameTurnChange} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
