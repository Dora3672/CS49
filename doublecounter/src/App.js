import "./styles.css";
import { useState } from "react";

export default function MyApp() {
  const [count, setCount] = useState(0);
  const [lastClicked, setLastClicked] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  function handleClick(buttonId) {
    setCount(count + 1);

    // Check if the current button is clicked in sequence
    if (buttonId === lastClicked) {
      setCurrentStreak(currentStreak + 1);

      // Update the highest streak if the current streak is greater
      if (currentStreak + 1 > highestStreak) {
        setHighestStreak(currentStreak + 1);
      }
    } else {
      setCurrentStreak(1);
    }

    setLastClicked(buttonId);
  }

  function reset() {
    setCount(0);
    setLastClicked(null);
    setCurrentStreak(0);
  }

  return (
    <div className="container">
      <h1>Counters that update together</h1>
      <div className="button-container">
        <MyButton count={count} onClick={() => handleClick("left")} />
        <MyButton count={count} onClick={() => handleClick("right")} />
      </div>
      <button onClick={reset} className="reset-button">
        Reset
      </button>
      {lastClicked && (
        <div>
          <p className="last-clicked-text">
            Last clicked button:{" "}
            <span className="highlight">{lastClicked}</span>
          </p>
          <p className="streak-text">
            Current streak: {currentStreak} | Highest streak: {highestStreak}
          </p>
        </div>
      )}
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick} className="my-button">
      Clicked {count} times
    </button>
  );
}
