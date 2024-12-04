// Dom Elements
const squares = document.querySelectorAll(".game-square");
const turnDisplay = document.getElementById("turn");
const playAgainButton = document.getElementById("button-play-again");
const scoreX = document.getElementById("scoreboard-x");
const scoreO = document.getElementById("scoreboard-o");

//Games State
let board = Array(9).fill(null); // Represents the 3x3 grid
let currentPlayer = "X"; // Tracks Whose turn it is
let gameActive = true; // Determine the games ongoing
let scores = { X: 0, O: 0 }; // Keeps track of the scores

// Winning Combinations
const winningCombinations = [
    [0, 1, 2], // Top Rows
    [3, 4, 5], // Middle Rows
    [6, 7, 8], // Bottom Rows
    [0, 3, 6], // Left Columns
    [1, 4, 7], // Right Columns
    [2, 5, 8], // Right Columns
    [0, 4, 8], // Diagonal (Top-Left to Bottom-Right)
    [2, 4, 6], // Diagonal (top-right to bottom-left)
];

// Function to update the display system
const updateTurnDisplay = () => {
    turnDisplay.textContent = gameActive
    ? `Player ${currentPlayer}`
    : "Game Over!";
};

// Function to check to see who wins
const checkWinner = () => {
    for (let combinations of winningCombinations) {
        const [a, b, c] = combinations;
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a]; // Returning the Winner ("X" or "0")
        }
    }
    return null; // No winners
};

// Function to handle a square clicking
const handleSquareClick = (index) => {
    if (!gameActive || board[index]) return; // Ignoring clicks on squares that are already done
    
    // Updating the board state and UI
    board[index] = currentPlayer;
    squares[index].textContent = currentPlayer;

    //Check for Winners or Draws
    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        scores[winner]++;
        updateScoreboard();
        turnDisplay.textContent = `Player ${winner} Wins!`;
    } else if (!board.includes(null)) {
        gameActive = false;
        turnDisplay.textContent = "It's a Draw!";
    } else {
        // Switch Turns
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateTurnDisplay();
    }
};

// Function to reset the whole game
const resetGame = () => {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = "X";
    squares.forEach((square) => (square.textContent = ""));
    updateTurnDisplay();
};

// Function to update the scoreboards
const updateScoreboard = () => {
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
};

// Event listener for each square
squares.forEach((square, index) => {
    square.addEventListener("click", () => handleSquareClick(index));
});

// Event Listener for the Play Again button
playAgainButton.addEventListener("click", resetGame);

// Initialize the game
resetGame();