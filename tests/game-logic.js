// Game logic utilities extracted for testing
export const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

export const checkWinner = (board) => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const isTerminal = (board) => {
  return checkWinner(board) !== null || board.every(cell => cell !== '');
};

export const getEmptyCells = (board) => {
  return board.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);
};

export const getRandomMove = (board) => {
  const emptyCells = getEmptyCells(board);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

export const minimax = (board, depth, isMaximizing) => {
  const scores = {
    X: -1,
    O: 1,
    tie: 0
  };

  const winner = checkWinner(board);
  if (winner !== null) {
    return scores[winner] / depth;
  }

  if (isTerminal(board)) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const getBestMove = (board) => {
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
};

export const isValidMove = (board, index) => {
  return index >= 0 && index < 9 && board[index] === '';
};

export const makeMove = (board, index, player) => {
  if (!isValidMove(board, index)) {
    return false;
  }
  board[index] = player;
  return true;
};

export const getNextPlayer = (currentPlayer) => {
  return currentPlayer === 'X' ? 'O' : 'X';
};