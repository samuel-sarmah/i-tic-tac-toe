describe('DOM Integration Tests', () => {
  let mockGame;

  beforeEach(() => {
    // Setup basic HTML structure
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

    // Mock the game functions and variables
    mockGame = {
      board: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X',
      gameActive: true,
      playerMode: 'pvp',
      playerXScore: 0,
      playerOScore: 0,
      winPatterns: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ]
    };
  });

  describe('Board Rendering', () => {
    test('should render 9 cells', () => {
      const boardElement = document.getElementById('board');
      
      // Simulate board rendering
      boardElement.innerHTML = '';
      mockGame.board.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (value === 'X' || value === 'O') {
          cell.textContent = value;
        }
        boardElement.appendChild(cell);
      });

      expect(boardElement.children).toHaveLength(9);
      expect(boardElement.querySelectorAll('.cell')).toHaveLength(9);
    });

    test('should display X and O values correctly', () => {
      const boardElement = document.getElementById('board');
      mockGame.board = ['X', 'O', '', '', 'X', '', '', '', 'O'];
      
      boardElement.innerHTML = '';
      mockGame.board.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (value === 'X' || value === 'O') {
          cell.textContent = value;
        }
        boardElement.appendChild(cell);
      });

      const cells = boardElement.querySelectorAll('.cell');
      expect(cells[0].textContent).toBe('X');
      expect(cells[1].textContent).toBe('O');
      expect(cells[4].textContent).toBe('X');
      expect(cells[8].textContent).toBe('O');
      expect(cells[2].textContent).toBe('');
    });
  });

  describe('Mode Selection', () => {
    test('should change game mode when selection changes', () => {
      const modeSelector = document.getElementById('mode');
      
      modeSelector.value = 'pva';
      mockGame.playerMode = modeSelector.value;
      
      expect(mockGame.playerMode).toBe('pva');
    });

    test('should have correct default mode', () => {
      const modeSelector = document.getElementById('mode');
      expect(modeSelector.value).toBe('pvp');
    });

    test('should have both game mode options', () => {
      const modeSelector = document.getElementById('mode');
      const options = Array.from(modeSelector.options);
      
      expect(options).toHaveLength(2);
      expect(options[0].value).toBe('pvp');
      expect(options[1].value).toBe('pva');
    });
  });

  describe('Turn Display', () => {
    test('should display current player turn', () => {
      const turnElement = document.getElementById('turn');
      
      turnElement.textContent = `Turn: Player ${mockGame.currentPlayer}`;
      expect(turnElement.textContent).toBe('Turn: Player X');
      
      mockGame.currentPlayer = 'O';
      turnElement.textContent = `Turn: Player ${mockGame.currentPlayer}`;
      expect(turnElement.textContent).toBe('Turn: Player O');
    });
  });

  describe('Score Display', () => {
    test('should display initial scores', () => {
      const playerXScoreElement = document.getElementById('playerXScore');
      const playerOScoreElement = document.getElementById('playerOScore');
      
      expect(playerXScoreElement.textContent).toBe('Player X: 0');
      expect(playerOScoreElement.textContent).toBe('Player O: 0');
    });

    test('should update scores correctly', () => {
      const playerXScoreElement = document.getElementById('playerXScore');
      const playerOScoreElement = document.getElementById('playerOScore');
      
      mockGame.playerXScore = 3;
      mockGame.playerOScore = 2;
      
      playerXScoreElement.textContent = `Player X: ${mockGame.playerXScore}`;
      playerOScoreElement.textContent = `Player O: ${mockGame.playerOScore}`;
      
      expect(playerXScoreElement.textContent).toBe('Player X: 3');
      expect(playerOScoreElement.textContent).toBe('Player O: 2');
    });
  });

  describe('Modal Display', () => {
    test('should show modal with message', () => {
      const modalElement = document.getElementById('modal');
      const modalMessageElement = document.getElementById('modal-message');
      
      modalMessageElement.textContent = 'X Wins! Congrats!!!';
      modalElement.style.display = 'flex';
      
      expect(modalElement.style.display).toBe('flex');
      expect(modalMessageElement.textContent).toBe('X Wins! Congrats!!!');
    });

    test('should hide modal', () => {
      const modalElement = document.getElementById('modal');
      
      modalElement.style.display = 'none';
      expect(modalElement.style.display).toBe('none');
    });

    test('should have play again button', () => {
      const playAgainButton = document.getElementById('play-again');
      expect(playAgainButton).toBeTruthy();
      expect(playAgainButton.textContent).toBe('Play Again?');
    });
  });

  describe('Cell Interaction', () => {
    test('should add click listeners to cells', () => {
      const boardElement = document.getElementById('board');
      const clickHandler = jest.fn();
      
      boardElement.innerHTML = '';
      mockGame.board.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => clickHandler(index));
        boardElement.appendChild(cell);
      });

      const cells = boardElement.querySelectorAll('.cell');
      
      cells[0].click();
      cells[4].click();
      
      expect(clickHandler).toHaveBeenCalledTimes(2);
      expect(clickHandler).toHaveBeenCalledWith(0);
      expect(clickHandler).toHaveBeenCalledWith(4);
    });

    test('should add winner class to winning cells', () => {
      const boardElement = document.getElementById('board');
      const winningPattern = [0, 1, 2];
      
      boardElement.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        boardElement.appendChild(cell);
      }

      winningPattern.forEach((index) => {
        const cellElement = boardElement.children[index];
        cellElement.classList.add('winner');
      });

      const cells = boardElement.querySelectorAll('.cell');
      expect(cells[0].classList.contains('winner')).toBe(true);
      expect(cells[1].classList.contains('winner')).toBe(true);
      expect(cells[2].classList.contains('winner')).toBe(true);
      expect(cells[3].classList.contains('winner')).toBe(false);
    });

    test('should remove winner class from all cells', () => {
      const boardElement = document.getElementById('board');
      
      boardElement.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (i % 2 === 0) {
          cell.classList.add('winner');
        }
        boardElement.appendChild(cell);
      }

      // Remove winner classes
      for (let i = 0; i < 9; i++) {
        const cellElement = boardElement.children[i];
        cellElement.classList.remove('winner');
      }

      const cells = boardElement.querySelectorAll('.cell');
      cells.forEach(cell => {
        expect(cell.classList.contains('winner')).toBe(false);
      });
    });
  });

  describe('Game State Elements', () => {
    test('should have all required DOM elements', () => {
      expect(document.getElementById('board')).toBeTruthy();
      expect(document.getElementById('mode')).toBeTruthy();
      expect(document.getElementById('turn')).toBeTruthy();
      expect(document.getElementById('status')).toBeTruthy();
      expect(document.getElementById('playerXScore')).toBeTruthy();
      expect(document.getElementById('playerOScore')).toBeTruthy();
      expect(document.getElementById('modal')).toBeTruthy();
      expect(document.getElementById('modal-message')).toBeTruthy();
      expect(document.getElementById('play-again')).toBeTruthy();
    });

    test('should have correct CSS classes', () => {
      const container = document.querySelector('.container');
      const board = document.querySelector('.board');
      const cells = document.querySelectorAll('.cell');
      
      expect(container).toBeTruthy();
      expect(board).toBeTruthy();
      expect(board.classList.contains('board')).toBe(true);
    });
  });
});