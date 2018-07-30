import React from "react";
import "./Counter.css";

const Counter = props => (
  <div className="card">
    <ul className="list-group list-group-flush">
      <li className="list-group-item"><strong>Current Score:</strong> {props.currentScore}
      </li>
      <li className="list-group-item"><strong>High Score:</strong> {props.highScore}
      </li>
    </ul>
  </div>
);

export default Counter;
