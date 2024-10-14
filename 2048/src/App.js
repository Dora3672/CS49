import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import ReactConfetti from "react-confetti";

class App extends React.Component {
  initialize = () => {
    const blankBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const initialState = {
      board: blankBoard,
      score: 0,
      gameOver: false,
      message: null,
      showConfetti: false,
      secretRewardTriggered: false,
      secretRewardTriggered1: false,
      currentImages: {
        set1: {},
        set2: {},
      },
      selectedSet: "set1",
      uploadedAndSavedSets: [],
      isCustomized: false,
    };
    this.setState(initialState);
  };

  constructor(props) {
    super(props);

    this.state = {
      board: null,
      score: 0,
      gameOver: false,
      message: null,
      showConfetti: false,
      secretRewardTriggered: false,
      secretRewardTriggered1: false,
      currentImages: {
        set1: {
          2: "url('https://upload.wikimedia.org/wikipedia/commons/2/2e/US_One_Cent_Obv.png')",
          4: "url('https://freepngimg.com/thumb/money/48917-1-nickel-download-free-image.png')",
          8: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Dime_Obverse_13.png/1200px-Dime_Obverse_13.png')",
          16: "url('https://cdn.pixabay.com/photo/2016/03/31/17/35/america-1293768_960_720.png')",
          32: "url('https://upload.wikimedia.org/wikipedia/commons/0/07/US_Half_Dollar_Obverse_2015.png')",
          64: "url('https://www.pngall.com/wp-content/uploads/5/United-States-Dollar-Bill-PNG-Images.png')",
          128: "url('https://thumbs.dreamstime.com/b/five-u-s-dollar-banknote-high-resolution-photo-five-u-s-dollar-banknote-120253419.jpg')",
          256: "url('https://www.foreigncurrencyandcoin.com/wp-content/uploads/2018/12/products-17574.jpg')",
          512: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/US20-front.jpg/2560px-US20-front.jpg')",
          1024: "url('https://clipart-library.com/img/1419014.png')",
          2048: "url('https://clipart-library.com/img/1418920.jpg')",
        },
        set2: {
          2: "url('https://www.microscopemaster.com/images/clostridiafromflickr.jpg')",
          4: "url('data:image/jpeg;base64,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')",
          8: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/RT8-4.jpg/220px-RT8-4.jpg')",
          16: "url('data:image/jpeg;base64,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')",
          32: "url('data:image/jpeg;base64,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')",
          64: "url('https://cdn.britannica.com/03/147303-050-61055AF1/castor-oil-plant-cotyledons-leaves.jpg')",
          128: "url('https://images.csmonitor.com/csm/2018/04/1059719_1_0412-SLIMEMOLD-music_standard.jpg?alias=standard_900x600')",
          256: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Skorpionsfliege_Panorpa_communis_male_full_%28cropped%29.jpg/260px-Skorpionsfliege_Panorpa_communis_male_full_%28cropped%29.jpg')",
          512: "url('https://images.ctfassets.net/ww1ie0z745y7/2ZLgATkZvsbHjsnrPRzBYu/e592901dccc526622e39898e9271a7ef/Goldfish.jpeg?q=75')",
          1024: "url('https://www.thoughtco.com/thmb/Of57u9BLKLrCkxH6Z5_S9-yFybQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SameerIndricotherium-56a2544f5f9b58b7d0c91bc0-5c1d619746e0fb0001b6b9b3.jpg')",
          2048: "url('https://cdn.download.ams.birds.cornell.edu/api/v1/asset/303800251/1800')",
        },
      },
      selectedSet: "set1", // Default set
      uploadedAndSavedSets: [],
    };
  }

  saveScoreToLocalStorage(score) {
    const previousScores =
      JSON.parse(localStorage.getItem("leaderboard")) || [];
    const timestamp = new Date().toISOString();

    // Check if an entry with the same timestamp already exists
    const existingEntryIndex = previousScores.findIndex(
      (entry) => entry.timestamp === timestamp
    );

    const newScore = {
      score,
      timestamp,
    };

    previousScores.push(newScore);

    // Save the updated scores to local storage
    localStorage.setItem("leaderboard", JSON.stringify(previousScores));
  }

  componentDidMount() {
    this.initBoard();
    const body = document.querySelector("body");
    body.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  // Create board with two random coordinate numbers
  initBoard() {
    let score = this.state.score;
    this.saveScoreToLocalStorage(score);

    let board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    board = this.placeRandom(this.placeRandom(board));
    this.setState({
      board,
      score: 0,
      gameOver: false,
      message: null,
      showConfetti: false,
    });
  }

  getBlankCoordinates(board) {
    const blankCoordinates = [];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {
          blankCoordinates.push([r, c]);
        }
      }
    }

    return blankCoordinates;
  }

  randomStartingNumber() {
    const startingNumbers = [2, 4];
    const randomNumber =
      startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  }

  placeRandom(board) {
    const blankCoordinates = this.getBlankCoordinates(board);
    const randomCoordinate =
      blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = this.randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }

  boardMoved(original, updated) {
    return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
  }

  move(direction) {
    if (!this.state.gameOver) {
      let movedBoard;
      let movedScore = 0;

      if (this.state.score >= 1500 && !this.state.secretRewardTriggered) {
        // Select a random row to empty
        let rowToEmpty = Math.floor(Math.random() * this.state.board.length);

        // Get the values of the tiles in the selected row
        let rowValues = [...this.state.board[rowToEmpty]];

        // Empty the selected row
        let newBoard = this.state.board.map((row, index) =>
          index === rowToEmpty ? Array(row.length).fill(0) : row
        );

        // Calculate the sum of the values in the emptied column
        let rewardScore = rowValues.reduce((sum, value) => sum + value, 0);
        // Update the score and set the secret reward message
        this.setState(
          (prevState) => ({
            board: newBoard,
            score: prevState.score + rewardScore,
            secretRewardTriggered: true,
            message: `Secret reward automatically triggered! Emptied row ${
              rowToEmpty + 1
            }. Score +${rewardScore}!`,
          }),
          () => {
            // Clear the message after a short delay (adjust the timeout as needed)
            setTimeout(() => {
              this.setState({ message: "" });
            }, 3000); // 3000 milliseconds (3 seconds) delay
          }
        );

        return;
      }

      if (this.state.score >= 4000 && !this.state.secretRewardTriggered1) {
        // Select a random row to empty
        rowToEmpty = Math.floor(Math.random() * this.state.board.length);

        // Get the values of the tiles in the selected row
        rowValues = [...this.state.board[rowToEmpty]];

        // Empty the selected row
        newBoard = this.state.board.map((row, index) =>
          index === rowToEmpty ? Array(row.length).fill(0) : row
        );

        // Calculate the sum of the values in the emptied column
        rewardScore = rowValues.reduce((sum, value) => sum + value, 0);

        // Select a random column to empty
        const colToEmpty = Math.floor(
          Math.random() * this.state.board[0].length
        );

        // Get the values of the tiles in the selected column
        const colValues = this.state.board.map((row) => row[colToEmpty]);

        // Empty the selected column
        newBoard = this.state.board.map((row) =>
          row.map((value, index) => (index === colToEmpty ? 0 : value))
        );

        // Calculate the sum of the values in the emptied column
        const rewardScore1 = colValues.reduce((sum, value) => sum + value, 0);
        // Update the score and set the secret reward message
        this.setState(
          (prevState) => ({
            board: newBoard,
            score: prevState.score + rewardScore + rewardScore1,
            secretRewardTriggered1: true,
            message: `Secret reward automatically triggered! Emptied row ${
              rowToEmpty + 1
            }. Score +${rewardScore + rewardScore1}!`,
          }),
          () => {
            // Clear the message after a short delay (adjust the timeout as needed)
            setTimeout(() => {
              this.setState({ message: "" });
            }, 3000); // 3000 milliseconds (3 seconds) delay
          }
        );

        return;
      }

      // Continue with the existing move logic based on the specified direction
      if (direction === "up") {
        const movedUp = this.moveUp(this.state.board);
        if (this.boardMoved(this.state.board, movedUp.board)) {
          movedBoard = this.placeRandom(movedUp.board);
          movedScore = movedUp.score;
        }
      } else if (direction === "right") {
        const movedRight = this.moveRight(this.state.board);
        if (this.boardMoved(this.state.board, movedRight.board)) {
          movedBoard = this.placeRandom(movedRight.board);
          movedScore = movedRight.score;
        }
      } else if (direction === "down") {
        const movedDown = this.moveDown(this.state.board);
        if (this.boardMoved(this.state.board, movedDown.board)) {
          movedBoard = this.placeRandom(movedDown.board);
          movedScore = movedDown.score;
        }
      } else if (direction === "left") {
        const movedLeft = this.moveLeft(this.state.board);
        if (this.boardMoved(this.state.board, movedLeft.board)) {
          movedBoard = this.placeRandom(movedLeft.board);
          movedScore = movedLeft.score;
        }
      }

      if (movedBoard) {
        this.setState(
          (prevState) => ({
            board: movedBoard,
            score: prevState.score + movedScore,
          }),
          () => {
            if (this.checkForGameOver(this.state.board)) {
              this.setState({
                gameOver: true,
                message: "Game over!",
              });
            } else if (this.checkForWin(this.state.board)) {
              // Check for win condition (reached 2048)
              this.setState({
                gameOver: true,
                message: "Congratulations! You won the game!",
                showConfetti: true,
              });
            }
          }
        );
      }
    } else {
      this.setState({ message: "Game over. Please start a new game." });
    }
  }

  // Check for win condition (2048)
  checkForWin(board) {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 2048) {
          return true;
        }
      }
    }
    return false;
  }

  moveUp(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let score = 0;

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    board = this.rotateLeft(board);

    return { board, score };
  }

  moveRight(inputBoard) {
    let board = [];
    let score = 0;

    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    return { board, score };
  }

  moveDown(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let score = 0;

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    board = this.rotateLeft(board);

    return { board, score };
  }

  moveLeft(inputBoard) {
    let board = [];
    let score = 0;

    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    return { board, score };
  }

  rotateRight(matrix) {
    let result = [];

    for (let c = 0; c < matrix.length; c++) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.push(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  }

  rotateLeft(matrix) {
    let result = [];

    for (let c = matrix.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.unshift(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  }

  checkForGameOver(board) {
    let moves = [
      this.boardMoved(board, this.moveUp(board).board),
      this.boardMoved(board, this.moveRight(board).board),
      this.boardMoved(board, this.moveDown(board).board),
      this.boardMoved(board, this.moveLeft(board).board),
    ];

    return moves.includes(true) ? false : true;
  }

  handleKeyDown(e) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    const n = 78;

    if (e.keyCode === up) {
      this.move("up");
    } else if (e.keyCode === right) {
      this.move("right");
    } else if (e.keyCode === down) {
      this.move("down");
    } else if (e.keyCode === left) {
      this.move("left");
    } else if (e.keyCode === n) {
      this.initBoard();
    }
  }

  changeTileBackground = (setImage) => {
    this.setState({
      selectedSet: setImage,
    });
  };

  handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length !== 11) {
      alert("Please upload 11 images.");
      return;
    }

    const { currentImages } = this.state;
    const numSets = Object.keys(currentImages).length;

    const reader = new FileReader();

    reader.onload = (event) => {
      const newImageSet = { ...currentImages };
      const newSetName = `CustomSet${numSets}`;
      newImageSet[newSetName] = {};

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileURL = event.target.result;
        newImageSet[newSetName][2 ** (i + 1)] = `url('${fileURL}')`;
      }

      const newSetData = { name: newSetName, saved: false };
      const newSetArray = [...this.state.uploadedAndSavedSets, newSetData];
      this.setState({
        currentImages: newImageSet,
        selectedSet: newSetName,
        isCustomized: true,
        uploadedAndSavedSets: newSetArray,
      });
    };

    reader.readAsDataURL(files[0]);
  };

  saveCustomImages = (setName) => {
    const { uploadedAndSavedSets } = this.state;
    const updatedSets = uploadedAndSavedSets.map((set) =>
      set.name === setName ? { ...set, saved: true } : set
    );
    sessionStorage.setItem(
      setName,
      JSON.stringify(this.state.currentImages[this.state.selectedSet])
    );
    this.setState({ uploadedAndSavedSets: updatedSets, isCustomized: false });
  };

  recallCustomImages = (setName) => {
    const recalledImages = JSON.parse(sessionStorage.getItem(setName)) || {};
    if (Object.keys(recalledImages).length === 0) {
      alert("No custom images found for this set.");
      return;
    }
    const { currentImages, uploadedAndSavedSets } = this.state;
    const updatedImages = { ...currentImages, [setName]: recalledImages };
    const updatedSets = uploadedAndSavedSets.map((set) =>
      set.name === setName ? { ...set, saved: true } : set
    );
    this.setState({
      currentImages: updatedImages,
      selectedSet: setName,
      uploadedAndSavedSets: updatedSets,
    });
  };

  render() {
    const { board, score, showConfetti, currentImages, selectedSet, message } =
      this.state;

    const renderTile = (value, row, col) => {
      // Choose the appropriate background image based on the selected set and tile value
      const backgroundImage = currentImages[selectedSet][value];

      return (
        <Cell
          key={`${row}-${col}`}
          value={value}
          backgroundImage={backgroundImage}
        />
      );
    };

    return (
      <div>
        <div class="stylechange">
          <div
            className="button"
            onClick={() => {
              this.changeTileBackground("set1");
            }}
          >
            Money
          </div>

          <div
            className="button"
            onClick={() => {
              this.changeTileBackground("set2");
            }}
          >
            Life
          </div>

          {this.state.uploadedAndSavedSets.map(
            (setData, index) =>
              setData.saved && (
                <button
                  key={index}
                  onClick={() => this.recallCustomImages(setData.name)}
                  className="b"
                >
                  Custom {index + 1}
                </button>
              )
          )}

          <button onClick={() => this.fileInput.click()} className="b">
            Custom
          </button>
          <input
            type="file"
            ref={(fileInput) => (this.fileInput = fileInput)}
            style={{ display: "none" }}
            multiple
            onChange={this.handleImageUpload}
          />
        </div>

        <div
          className="button"
          onClick={() => {
            this.initBoard();
          }}
        >
          New Game
        </div>

        <div>
          <div
            className="button"
            id="up"
            onClick={() => {
              this.move("up");
            }}
          >
            Up
          </div>
        </div>

        <div className="buttons">
          <div
            className="button"
            id="left"
            onClick={() => {
              this.move("left");
            }}
          >
            Left
          </div>

          <div
            className="button"
            id="right"
            onClick={() => {
              this.move("right");
            }}
          >
            Right
          </div>
        </div>

        <div
          className="button"
          id="down"
          onClick={() => {
            this.move("down");
          }}
        >
          Down
        </div>

        <div className="score">Score: {this.state.score}</div>

        {this.state.board && (
          <table>
            {this.state.board.map((row, i) => (
              <Row key={i} row={row} renderTile={renderTile} />
            ))}
          </table>
        )}

        {this.state.showConfetti && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}

        <p>{this.state.message}</p>

        {this.state.uploadedAndSavedSets.map((setData, index) => (
          <div key={index}>
            {!setData.saved && (
              <button
                onClick={() => this.saveCustomImages(setData.name)}
                className="b"
              >
                Save Images
              </button>
            )}
          </div>
        ))}

        <Leaderboard />
      </div>
    );
  }
}

class Leaderboard extends React.Component {
  clearLeaderboard = () => {
    localStorage.removeItem("leaderboard");
    // Force a re-render to reflect the cleared leaderboard
    this.forceUpdate();
  };

  render() {
    const leaderboardData =
      JSON.parse(localStorage.getItem("leaderboard")) || [];
    const filteredLeaderboard = leaderboardData.filter(
      (entry) => entry.score > 0
    );
    const sortedLeaderboard = filteredLeaderboard.sort(
      (a, b) => b.score - a.score
    );
    const top10Scores = sortedLeaderboard.slice(0, 10);

    return (
      <div>
        <h2>Leaderboard</h2>
        <button onClick={this.clearLeaderboard} className="clearlb">
          Clear Leaderboard
        </button>
        <ol>
          {top10Scores.map((entry, index) => (
            <li key={index} className="log-item">
              <span className="time-column">{entry.timestamp}</span>
              <span className="score-column">{entry.score}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

function Row({ row, rowIndex, renderTile }) {
  return (
    <tr>{row.map((cell, colIndex) => renderTile(cell, rowIndex, colIndex))}</tr>
  );
}

function Cell({ value, backgroundImage }) {
  let color = "cell";
  if (value > 0) {
    color += ` color-${value}`;
  }

  return (
    <td className={color} style={{ backgroundImage: backgroundImage }}>
      {value > 0 ? value : ""}
    </td>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
