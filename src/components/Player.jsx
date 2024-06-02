import React, { useState } from "react";

function Player({ initialName, symbol, isActive, handleChangePlayer }) {
  const [isEditing, setisEditing] = useState(false);
  const [playerName, setplayerName] = useState(initialName);

  const handlePlayerName = (e) => {
    setplayerName(e.target.value);
  };

  const handleEditing = () => {
    setisEditing((prevState) => !prevState); 
    if (isEditing) {
      handleChangePlayer(symbol, playerName);
    }
  };

  let playerEditName = isEditing ? (
    <input
      type="text"
      required
      value={playerName}
      onChange={handlePlayerName}
    />
  ) : (
    <span className="playerName">{playerName}</span>
  );
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerEditName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
