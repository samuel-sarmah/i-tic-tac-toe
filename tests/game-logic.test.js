import {
  winPatterns,
  checkWinner,
  isTerminal,
  getEmptyCells,
  getRandomMove,
  minimax,
  getBestMove,
  isValidMove,
  makeMove,
  getNextPlayer
} from './game-logic.js';

describe('Game Logic', () => {
  describe('winPatterns', () => {
    test('should have 8 winning patterns', () => {
      expect(winPatterns).toHaveLength(8);
    });

    test('should contain all row patterns', () => {
      expect(winPatterns).toContainEqual([0, 1, 2]);
      expect(winPatterns).toContainEqual([3, 4, 5]);
      expect(winPatterns).toContainEqual([6, 7, 8]);
    });

    test('should contain all column patterns', () => {
      expect(winPatterns).toContainEqual([0, 3, 6]);
      expect(winPatterns).toContainEqual([1, 4, 7]);
      expect(winPatterns).toContainEqual([2, 5, 8]);
    });

    test('should contain all diagonal patterns', () => {
      expect(winPatterns).toContainEqual([0, 4, 8]);
      expect(winPatterns).toContainEqual([2, 4, 6]);
    });
  });

  describe('checkWinner', () => {
    test('should return null for empty board', () => {
      const board = ['', '', '', '', '', '', '', '', ''];
      expect(checkWinner(board)).toBeNull();
    });

    test('should return X for X row win', () => {
      const board = ['X', 'X', 'X', '', '', '', '', '', ''];
      expect(checkWinner(board)).toBe('X');
    });

    test('should return O for O column win', () => {
      const board = ['O', '', '', 'O', '', '', 'O', '', ''];
      expect(checkWinner(board)).toBe('O');
    });

    test('should return X for diagonal win', () => {
      const board = ['X', '', '', '', 'X', '', '', '', 'X'];
      expect(checkWinner(board)).toBe('X');
    });

    test('should return null for board with no winner', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
      expect(checkWinner(board)).toBeNull();
    });
  });

  describe('isTerminal', () => {
    test('should return true when there is a winner', () => {
      const board = ['X', 'X', 'X', '', '', '', '', '', ''];
      expect(isTerminal(board)).toBe(true);
    });

    test('should return true for draw', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
      expect(isTerminal(board)).toBe(true);
    });

    test('should return false for ongoing game', () => {
      const board = ['X', '', '', '', '', '', '', '', ''];
      expect(isTerminal(board)).toBe(false);
    });
  });

  describe('getEmptyCells', () => {
    test('should return all cells for empty board', () => {
      const board = ['', '', '', '', '', '', '', '', ''];
      expect(getEmptyCells(board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    test('should return only empty cells', () => {
      const board = ['X', '', 'O', '', '', '', '', '', 'X'];
      expect(getEmptyCells(board)).toEqual([1, 3, 4, 5, 6, 7]);
    });

    test('should return empty array for full board', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
      expect(getEmptyCells(board)).toEqual([]);
    });
  });

  describe('isValidMove', () => {
    test('should return true for valid empty cell', () => {
      const board = ['X', '', '', '', '', '', '', '', ''];
      expect(isValidMove(board, 1)).toBe(true);
    });

    test('should return false for occupied cell', () => {
      const board = ['X', '', '', '', '', '', '', '', ''];
      expect(isValidMove(board, 0)).toBe(false);
    });

    test('should return false for invalid index', () => {
      const board = ['', '', '', '', '', '', '', '', ''];
      expect(isValidMove(board, -1)).toBe(false);
      expect(isValidMove(board, 9)).toBe(false);
    });
  });

  describe('makeMove', () => {
    test('should successfully make valid move', () => {
      const board = ['', '', '', '', '', '', '', '', ''];
      const result = makeMove(board, 0, 'X');
      expect(result).toBe(true);
      expect(board[0]).toBe('X');
    });

    test('should reject invalid move', () => {
      const board = ['X', '', '', '', '', '', '', '', ''];
      const result = makeMove(board, 0, 'O');
      expect(result).toBe(false);
      expect(board[0]).toBe('X');
    });
  });

  describe('getNextPlayer', () => {
    test('should return O when current is X', () => {
      expect(getNextPlayer('X')).toBe('O');
    });

    test('should return X when current is O', () => {
      expect(getNextPlayer('O')).toBe('X');
    });
  });

  describe('getRandomMove', () => {
    test('should return a valid empty cell', () => {
      const board = ['X', '', '', '', '', '', '', '', ''];
      const move = getRandomMove(board);
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThan(9);
      expect(board[move]).toBe('');
    });

    test('should throw error for full board', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
      expect(() => getRandomMove(board)).toThrow();
    });
  });

  describe('minimax', () => {
    test('should return high score for winning O move', () => {
      const board = ['O', 'O', '', '', '', '', '', '', ''];
      const score = minimax(board, 1, true);
      expect(score).toBeGreaterThan(0);
    });

    test('should return low score for winning X move', () => {
      const board = ['X', 'X', '', '', '', '', '', '', ''];
      const score = minimax(board, 1, false);
      expect(score).toBeLessThan(0);
    });

    test('should return 0 for draw', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', ''];
      const score = minimax(board, 1, true);
      expect(score).toBe(0);
    });
  });

  describe('getBestMove', () => {
    test('should return winning move for O', () => {
      const board = ['O', 'O', '', 'X', 'X', '', '', '', ''];
      const bestMove = getBestMove(board);
      expect(bestMove).toBe(2);
    });

    test('should block X from winning', () => {
      const board = ['X', 'X', '', 'O', '', '', '', '', ''];
      const bestMove = getBestMove(board);
      expect(bestMove).toBe(2);
    });

    test('should take center when available', () => {
      const board = ['X', '', '', '', '', '', '', '', ''];
      const bestMove = getBestMove(board);
      expect(bestMove).toBe(4);
    });

    test('should take corner when center is taken', () => {
      const board = ['', '', '', '', 'X', '', '', '', ''];
      const bestMove = getBestMove(board);
      expect([0, 2, 6, 8]).toContain(bestMove);
    });
  });
});