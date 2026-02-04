import { jest } from '@jest/globals';

// Test utilities for DOM manipulation and testing
export const createMockBoard = () => {
  document.body.innerHTML = `
    <div class="container">
      <h1>Tic Tac Toe</h1>
      <div id="mode-selector">
        <label for="mode">Game Mode:</label>
        <select name="mode" id="mode">
          <option value="pvp">Player vs Player</option>
          <option value="pva">Player vs AI</option>
        </select>
      </div>
      <div id="board" class="board"></div>
      <div id="info">
        <div id="turn"></div>
        <div id="status"></div>
        <div id="score">
          <div class="player-score" id="playerXScore">Player X: 0</div>
          <div class="player-score" id="playerOScore">Player O: 0</div>
        </div>
      </div>
      <div id="modal" class="modal">
        <div class="modal-content">
          <p id="modal-message"></p>
          <button id="play-again">Play Again?</button>
        </div>
      </div>
    </div>
  `;
};

export const renderMockBoard = (board = ['', '', '', '', '', '', '', '', '']) => {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (value === 'X' || value === 'O') {
      cell.textContent = value;
    }
    cell.dataset.index = index;
    boardElement.appendChild(cell);
  });
  return boardElement.querySelectorAll('.cell');
};

export const mockClickEvent = (element) => {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  element.dispatchEvent(event);
};

export const waitForDOMUpdate = () => new Promise(resolve => setTimeout(resolve, 0));

export const getComputedStyle = (element) => {
  return window.getComputedStyle(element);
};

export const mockViewport = (width, height) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height
  });
  window.dispatchEvent(new Event('resize'));
};

export const createMockGameState = () => ({
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'X',
  gameActive: true,
  playerMode: 'pvp',
  playerXScore: 0,
  playerOScore: 0
});

export const simulateGameMoves = (gameState, moves) => {
  const results = [];
  moves.forEach((move, index) => {
    if (gameState.gameActive && gameState.board[move] === '') {
      const player = gameState.currentPlayer;
      gameState.board[move] = player;
      results.push({ move, player, board: [...gameState.board] });
      
      // Simple winner check
      const winner = checkSimpleWinner(gameState.board);
      if (winner) {
        gameState.gameActive = false;
        if (winner === 'X') gameState.playerXScore++;
        else gameState.playerOScore++;
      } else if (gameState.board.every(cell => cell !== '')) {
        gameState.gameActive = false;
      } else {
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  });
  return results;
};

const checkSimpleWinner = (board) => {
  const patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];
  
  for (const [a, b, c] of patterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const expectElementExists = (selector) => {
  const element = document.querySelector(selector);
  expect(element).toBeTruthy();
  return element;
};

export const expectElementsExist = (selector, count) => {
  const elements = document.querySelectorAll(selector);
  expect(elements).toHaveLength(count);
  return elements;
};

export const expectElementVisible = (element) => {
  expect(element.offsetParent).not.toBeNull();
};

export const expectElementHidden = (element) => {
  expect(element.offsetParent).toBeNull();
};

export const expectTextContent = (element, expectedText) => {
  expect(element.textContent).toBe(expectedText);
};

export const expectClassContains = (element, className) => {
  expect(element.classList.contains(className)).toBe(true);
};

export const expectClassNotContains = (element, className) => {
  expect(element.classList.contains(className)).toBe(false);
};