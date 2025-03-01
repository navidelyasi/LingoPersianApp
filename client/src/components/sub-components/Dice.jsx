import React from "react";
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";
import "../../styles/sub-styles/dice.css";

function Dice({ diceNumber, isRolling, moving, rollDice }) {
  return (
    <div className="dice-container">
      {diceNumber === 1 && (
        <FaDiceOne
          className={`dice ${isRolling ? "rolling" : ""} ${
            moving ? "disabled" : ""
          }`}
          onClick={!moving ? () => rollDice() : undefined}
        />
      )}
      {diceNumber === 2 && (
        <FaDiceTwo
          className={`dice ${isRolling ? "rolling" : ""} ${
            moving ? "disabled" : ""
          }`}
          onClick={!moving ? () => rollDice() : undefined}
        />
      )}
      {diceNumber === 3 && (
        <FaDiceThree
          className={`dice ${isRolling ? "rolling" : ""} ${
            moving ? "disabled" : ""
          }`}
          onClick={!moving ? () => rollDice() : undefined}
        />
      )}
      {diceNumber === 4 && (
        <FaDiceFour
          className={`dice ${isRolling ? "rolling" : ""} ${
            moving ? "disabled" : ""
          }`}
          onClick={!moving ? () => rollDice() : undefined}
        />
      )}
      {diceNumber === 5 && (
        <FaDiceFive
          className={`dice ${isRolling ? "rolling" : ""} ${
            moving ? "disabled" : ""
          }`}
          onClick={!moving ? () => rollDice() : undefined}
        />
      )}
      {diceNumber === 6 && (
        <FaDiceSix
          className={`dice ${isRolling ? "rolling" : ""} ${
            moving ? "disabled" : ""
          }`}
          onClick={!moving ? () => rollDice() : undefined}
        />
      )}
    </div>
  );
}

export default Dice;
