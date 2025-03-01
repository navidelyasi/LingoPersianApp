import React from "react";
import Broom from "./Broom.jsx";
import "../../styles/sub-styles/broom.css";

function HalloweenBoard({ pumpkinOrBroomNumber }) {
  return (
    <div>
      <img
        src="/pictures/general/halloween/board-halloween.png"
        alt="halloween-board-game"
        style={{ width: "100%", height: "100%" }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 1 ? "selected" : ""
        } pumpkin1`}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin2"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 2 ? "selected" : ""
        } pumpkin2`}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin3"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 3 ? "selected" : ""
        } pumpkin3`}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin4"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 4 ? "selected" : ""
        } pumpkin4`}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin5"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 5 ? "selected" : ""
        } pumpkin5`}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin6"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 6 ? "selected" : ""
        } pumpkin6`}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin7"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 7 ? "selected" : ""
        } pumpkin7`}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin8"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 8 ? "selected" : ""
        } pumpkin8`}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin9"
        className={`shaking-pumpkin ${
          pumpkinOrBroomNumber === 9 ? "selected" : ""
        } pumpkin9`}
      />

      <div
        className={`broom1 ${pumpkinOrBroomNumber === 11 ? "selected" : ""}`}
      >
        <Broom />
      </div>
      <div
        className={`broom2 ${pumpkinOrBroomNumber === 12 ? "selected" : ""}`}
      >
        <Broom />
      </div>
      <div
        className={`broom3 ${pumpkinOrBroomNumber === 13 ? "selected" : ""}`}
      >
        <Broom />
      </div>
      <div
        className={`broom4 ${pumpkinOrBroomNumber === 14 ? "selected" : ""}`}
      >
        <Broom />
      </div>
    </div>
  );
}

export default HalloweenBoard;
