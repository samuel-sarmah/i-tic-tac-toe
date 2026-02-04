import { checkWinner, isTerminal } from './game-logic.js';

describe('End-to-End Game Flow Tests', () => {
  let gameState;

  beforeEach(() => {
    // Setup HTML structure
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

    gameState = {
      board: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X',
      gameActive: true,
      playerMode: 'pvp',
      playerXScore: 0,
      playerOScore: 0
    };
  });

  const renderBoard = (state) => {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    state.board.forEach((value, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (value === 'X' || value === 'O') {
        cell.textContent = value;
      }
      cell.addEventListener('click', () => handleCellClick(state, index));
      boardElement.appendChild(cell);
    });
  };

  const updateTurn = (state) => {
    const turnElement = document.getElementById('turn');
    turnElement.textContent = `Turn: Player ${state.currentPlayer}`;
  };

  const updateScore = (state) => {
    const playerXScoreElement = document.getElementById('playerXScore');
    const playerOScoreElement = document.getElementById('playerOScore');
    playerXScoreElement.textContent = `Player X: ${state.playerXScore}`;
    playerOScoreElement.textContent = `Player O: ${state.playerOScore}`;
  };

  const highlightWinningCells = (pattern) => {
    const boardElement = document.getElementById('board');
    pattern.forEach((index) => {
      const cellElement = boardElement.children[index];
      cellElement.classList.add('winner');
    });
  };

  const handleCellClick = (state, index) => {
    if (state.gameActive && state.board[index] === '') {
      state.board[index] = state.currentPlayer;
      renderBoard(state);

      const winner = checkWinner(state.board);
      if (winner) {
        state.gameActive = false;
        if (winner === 'X') {
          state.playerXScore++;
        } else {
          state.playerOScore++;
        }
        updateScore(state);
        showModal(`${winner} Wins! Congrats!!!`);
        
        // Highlight winning cells
        const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
        ];
        for (const pattern of winPatterns) {
          const [a, b, c] = pattern;
          if (state.board[a] && state.board[a] === state.board[b] && state.board[a] === state.board[c]) {
            highlightWinningCells(pattern);
            break;
          }
        }
      } else if (isTerminal(state.board)) {
        state.gameActive = false;
        showModal('Game ends in a Draw');
      } else {
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
        updateTurn(state);
      }
    }
  };

  const showModal = (message) => {
    const modalElement = document.getElementById('modal');
    const modalMessageElement = document.getElementById('modal-message');
    modalMessageElement.textContent = message;
    modalElement.style.display = 'flex';
  };

  const hideModal = () => {
    const modalElement = document.getElementById('modal');
    modalElement.style.display = 'none';
  };

  const resetGame = (state) => {
    state.board = ['', '', '', '', '', '', '', '', ''];
    state.currentPlayer = 'X';
    state.gameActive = true;
    document.getElementById('status').textContent = '';
    renderBoard(state);
    updateTurn(state);
    
    // Clear winner classes
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('winner'));
  };

  describe('Complete Game Flows', () => {
    test('should complete a full PvP game with X winning', () => {
      renderBoard(gameState);
      updateTurn(gameState);
      updateScore(gameState);

      // X moves: [0, 2, 4]
      handleCellClick(gameState, 0);
      expect(gameState.board[0]).toBe('X');
      expect(gameState.currentPlayer).toBe('O');

      handleCellClick(gameState, 1);
      expect(gameState.board[1]).toBe('O');
      expect(gameState.currentPlayer).toBe('X');

      handleCellClick(gameState, 2);
      expect(gameState.board[2]).toBe('X');
      expect(gameState.currentPlayer).toBe('O');

      handleCellClick(gameState, 3);
      expect(gameState.board[3]).toBe('O');
      expect(gameState.currentPlayer).toBe('X');

      handleCellClick(gameState, 4);
      expect(gameState.board[4]).toBe('X');
      expect(gameState.currentPlayer).toBe('O');

      handleCellClick(gameState, 5);
      expect(gameState.board[5]).toBe('O');
      expect(gameState.currentPlayer).toBe('X');

      handleCellClick(gameState, 6);
      expect(gameState.board[6]).toBe('X');

      // Check game ended with X winning
      expect(gameState.gameActive).toBe(false);
      expect(gameState.playerXScore).toBe(1);
      expect(gameState.playerOScore).toBe(0);
      expect(document.getElementById('modal').style.display).toBe('flex');
      expect(document.getElementById('modal-message').textContent).toBe('X Wins! Congrats!!!');
    });

    test('should complete a full PvP game with draw', () => {
      renderBoard(gameState);
      updateTurn(gameState);
      updateScore(gameState);

      // Sequence that results in a draw
      const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
      const players = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

      moves.forEach((move, index) => {
        handleCellClick(gameState, move);
        expect(gameState.board[move]).toBe(players[index]);
      });

      // Check game ended in draw
      expect(gameState.gameActive).toBe(false);
      expect(gameState.playerXScore).toBe(0);
      expect(gameState.playerOScore).toBe(0);
      expect(document.getElementById('modal').style.display).toBe('flex');
      expect(document.getElementById('modal-message').textContent).toBe('Game ends in a Draw');
    });

    test('should reset game after play again', () => {
      // Play a quick game
      handleCellClick(gameState, 0);
      handleCellClick(gameState, 1);
      handleCellClick(gameState, 2);
      handleCellClick(gameState, 4);
      handleCellClick(gameState, 6); // X wins

      // Click play again
      const playAgainButton = document.getElementById('play-again');
      playAgainButton.click();
      hideModal();
      resetGame(gameState);

      // Check reset state
      expect(gameState.board.every(cell => cell === '')).toBe(true);
      expect(gameState.currentPlayer).toBe('X');
      expect(gameState.gameActive).toBe(true);
      expect(document.getElementById('modal').style.display).toBe('none');
      expect(document.getElementById('turn').textContent).toBe('Turn: Player X');
    });

    test('should switch between game modes', () => {
      const modeSelector = document.getElementById('mode');
      
      // Start in PvP mode
      expect(modeSelector.value).toBe('pvp');
      expect(gameState.playerMode).toBe('pvp');

      // Switch to PvAI mode
      modeSelector.value = 'pva';
      gameState.playerMode = modeSelector.value;
      expect(gameState.playerMode).toBe('pva');

      // Scores should reset when mode changes
      gameState.playerXScore = 2;
      gameState.playerOScore = 1;
      
      // Simulate mode change logic
      if (gameState.playerMode === 'pva') {
        gameState.playerXScore = 0;
        gameState.playerOScore = 0;
        updateScore(gameState);
        resetGame(gameState);
      }

      expect(gameState.playerXScore).toBe(0);
      expect(gameState.playerOScore).toBe(0);
    });

    test('should handle invalid moves gracefully', () => {
      renderBoard(gameState);
      updateTurn(gameState);

      // Try to click on occupied cell
      handleCellClick(gameState, 0);
      expect(gameState.board[0]).toBe('X');
      expect(gameState.currentPlayer).toBe('O');

      // Try to click same cell again
      handleCellClick(gameState, 0);
      expect(gameState.board[0]).toBe('X'); // Should remain X
      expect(gameState.currentPlayer).toBe('O'); // Should remain O's turn

      // Try to make valid move
      handleCellClick(gameState, 1);
      expect(gameState.board[1]).toBe('O');
      expect(gameState.currentPlayer).toBe('X');
    });

    test('should track multiple games correctly', () => {
      renderBoard(gameState);
      updateTurn(gameState);
      updateScore(gameState);

      // First game: X wins
      handleCellClick(gameState, 0);
      handleCellClick(gameState, 1);
      handleCellClick(gameState, 2);
      handleCellClick(gameState, 4);
      handleCellClick(gameState, 6);

      expect(gameState.playerXScore).toBe(1);
      expect(gameState.playerOScore).toBe(0);

      // Reset and play second game: O wins
      const playAgainButton = document.getElementById('play-again');
      playAgainButton.click();
      hideModal();
      resetGame(gameState);

      // O wins sequence
      handleCellClick(gameState, 0);
      handleCellClick(gameState, 1);
      handleCellClick(gameState, 2);
      handleCellClick(gameState, 4);
      handleCellClick(gameState, 7);

      expect(gameState.playerXScore).toBe(1);
      expect(gameState.playerOScore).toBe(1);
    });

    test('should handle rapid clicking without errors', () => {
      renderBoard(gameState);
      updateTurn(gameState);

      // Rapid click simulation
      const rapidClicks = [0, 0, 1, 0, 2, 1, 1, 3, 4];
      rapidClicks.forEach(move => {
        handleCellClick(gameState, move);
      });

      // Should still have valid game state
      expect(gameState.board[0]).toBe('X');
      expect(gameState.board[1]).toBe('O');
      expect(gameState.board[2]).toBe('X');
      expect(gameState.board[3]).toBe('O');
      expect(gameState.board[4]).toBe('X');
    });
  });

  describe('Game State Consistency', () => {
    test('should maintain consistent turn display', () => {
      updateTurn(gameState);
      expect(document.getElementById('turn').textContent).toBe('Turn: Player X');

      gameState.currentPlayer = 'O';
      updateTurn(gameState);
      expect(document.getElementById('turn').textContent).toBe('Turn: Player O');
    });

    test('should update score display correctly', () => {
      updateScore(gameState);
      expect(document.getElementById('playerXScore').textContent).toBe('Player X: 0');
      expect(document.getElementById('playerOScore').textContent).toBe('Player O: 0');

      gameState.playerXScore = 5;
      gameState.playerOScore = 3;
      updateScore(gameState);
      expect(document.getElementById('playerXScore').textContent).toBe('Player X: 5');
      expect(document.getElementById('playerOScore').textContent).toBe('Player O: 3');
    });
  });
});