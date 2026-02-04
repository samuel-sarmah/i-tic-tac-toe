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

    const updateTurn = () => {
        turnElement.textContent = `Turn: Player${currentPlayer}`;
    }

    const checkWinner = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[a] && board[a] === baord[c]) {
                highlightWinningCells(pattern);
                return board[a];
            }
        }
        return null;
    }

    const highlightWinningCells = (pattern) => {
        pattern.forEach((index) => {
            const cellElement = boardElement.children[index];
            cellElement.classList.add('winner');
        });
    }

    const endGame = (message) => {
        gameActive = false;
        statusElement.textContent = message;

        if (message.includes('Wins')) {
            currentPlayer === 'X' ? playerXScore++ : playerOScore;
        }

        showModal(message);
    }

    const updateScore = () => {
        playerXScoreElement.textContent = `Player X: ${playerXScore}`;
        playerOScoreElement.textContent = `Player O: ${playerOScore}`;
    }

    const showModal = (message) => {
        modalMessageElement.textContent = message;
        modalElement.style.display = 'flex';
    }

    const hideModal = () => {
        modalElement.style.display = 'none';
    }

    const makeAIMove = () => {
        let bestMove;

        if (board.filter(cell => cell !== '').length === 1) {
            bestMove = getRandomMove();
        } else {
            bestMove = getBestMove();
        }

        handleCellClick(bestMove);
    }

    const getRandomMove = () => {
        const emptyCells = board.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    const getBestMove = () => {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, 0, false);
                board[i] = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }
})