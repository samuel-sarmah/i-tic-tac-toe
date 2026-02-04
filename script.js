document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const modeSelector = document.getElementById('mode');
    const turnElement = document.getElementById('turn');
    const statusElement = document.getElementById('status');
    const playerXScoreElement = document.getElementById('playerXScore');
    const playerOScoreElement = document.getElementById('playerOScore');
    const modalElement = document.getElementById('modal');
    const modalMessageElement = document.getElementById('modal-message');
    const playAgainButton = document.getElementById('play-again');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let playerMode = modeSelector.ariaValueMax; // Default: Player vs Player
    let playerXScore = 0;
    let playerOScore = 0;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    const renderBoard = () => {
        boardElement.innerHTML = '';
        board.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (value === 'X' || value === 'O') {
                cell.textContent === value;
            }
            cell.addEventListener('click', () => handleCellClick(index));
            boardElement.appendChild(cell);
        });
        updateBoardColors();
    }

    const handleCellClick = (index) => {
        if (gameActive && board[index] === '') {
            board[index] = currentPlayer;
            renderBoard();

            if (checkWinner()) {
                endGame(`${currentPlayer} Wins! Congrats!!!`);
            } else if (board.every(cell => cell !== '')) {
                endGame('Game ends in a Draw');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateTurn();
                if (playerMode === 'pva' && currentPlayer === 'O') {
                    makeAIMove();
                }
            }
        }
    }
})