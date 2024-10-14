// App.js

import React, { useState } from "react";
import Button from "./Button";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(5);
  const [loggedCounts, setLoggedCounts] = useState([]);

  function increment() {
    setCount((previousCount) => previousCount + 1);
  }

  function decrement() {
    setCount((previousCount) => previousCount - 1);
  }

  function reset() {
    setCount((previousCount) => 0);
  }

  function bigger() {
    setCount((previousCount) => previousCount * 3 + 1);
  }

  function smaller() {
    setCount((previousCount) => Math.floor(previousCount / 2));
  }

  function random() {
    setCount((previousCount) => Math.floor(Math.random() * 50));
  }

  function two() {
    setCount((previousCount) => previousCount * 2);
  }

  function logCount() {
    const currentDate = new Date();
    const newLoggedCount = {
      value: count,
      timestamp: currentDate.toLocaleString(),
    };
    setLoggedCounts((prevLoggedCounts) => [
      newLoggedCount,
      ...prevLoggedCounts,
    ]);
  }

  function clearLog() {
    setLoggedCounts([]);
  }

  return (
    <div className="App">
      <h1>Counter</h1>
      <Button action={increment} name="UP" />
      <Button action={decrement} name="Down" />
      <Button action={reset} name="Reset" />
      <Button action={random} name="Random" />
      <h2>{count}</h2>
      <Button action={bigger} name="3x+1" />
      <Button action={smaller} name="x/2" />
      <Button action={two} name="2x" />
      <Button action={logCount} name="Log Count" />

      {/* Display logged counts as a list with two columns */}
      {loggedCounts.length > 0 && (
        <div>
          <p>Logged Counts:</p>
          <ul>
            {loggedCounts.map((log, index) => (
              <li key={index} className="log-item">
                <span className="timestamp-column">{log.timestamp}</span>
                <span className="value-column">{log.value}</span>
              </li>
            ))}
          </ul>
          {/* Button to clear the log */}
          <Button action={clearLog} name="Clear Log" />
        </div>
      )}
    </div>
  );
}
