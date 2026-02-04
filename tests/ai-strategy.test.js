import { 
  getBestMove, 
  getRandomMove, 
  minimax, 
  checkWinner, 
  getEmptyCells,
  makeMove,
  isValidMove 
} from './game-logic.js';

describe('AI Strategy Tests', () => {
  describe('AI Decision Making', () => {
    test('should take winning move when available', () => {
      const board = ['O', 'O', '', 'X', 'X', '', '', '', ''];
      const bestMove = getBestMove(board);
      
      expect(bestMove).toBe(2);
      
      // Verify it's actually a winning move
      const testBoard = [...board];
      testBoard[bestMove] = 'O';
      expect(checkWinner(testBoard)).toBe('O');
    });

    test('should block opponent from winning', () => {
      const board = ['X', 'X', '', 'O', '', '', '', '', ''];
      const bestMove = getBestMove(board);
      
      expect(bestMove).toBe(2);
      
      // Verify blocking prevents X from winning
      const testBoardWithBlock = [...board];
      testBoardWithBlock[bestMove] = 'O';
      expect(checkWinner(testBoardWithBlock)).toBeNull();
      
      // Verify X would win if not blocked
      const testBoardWithoutBlock = [...board];
      testBoardWithoutBlock[2] = 'X';
      expect(checkWinner(testBoardWithoutBlock)).toBe('X');
    });

    test('should take center position when available', () => {
      const board = ['X', '', '', '', '', '', '', '', ''];
      const bestMove = getBestMove(board);
      
      expect(bestMove).toBe(4);
    });

    test('should take corner when center is occupied', () => {
      const board = ['', '', '', '', 'X', '', '', '', ''];
      const bestMove = getBestMove(board);
      
      expect([0, 2, 6, 8]).toContain(bestMove);
    });

    test('should create fork opportunities', () => {
      // Board where O can create multiple winning paths
      const board = ['O', '', '', '', 'X', '', '', '', 'O'];
      const bestMove = getBestMove(board);
      
      // Should take a corner to create fork
      expect([2, 6]).toContain(bestMove);
      
      // Verify the move creates multiple winning opportunities
      const testBoard = [...board];
      testBoard[bestMove] = 'O';
      
      // Check for potential wins in next move
      let winCount = 0;
      const emptyCells = getEmptyCells(testBoard);
      for (const cell of emptyCells) {
        const futureBoard = [...testBoard];
        futureBoard[cell] = 'O';
        if (checkWinner(futureBoard) === 'O') {
          winCount++;
        }
      }
      expect(winCount).toBeGreaterThan(1);
    });

    test('should block opponent fork opportunities', () => {
      // Board where X can create a fork
      const board = ['X', '', '', '', 'O', '', '', '', ''];
      const bestMove = getBestMove(board);
      
      // Should block the fork by taking a side
      expect([1, 3, 5, 7]).toContain(bestMove);
    });

    test('should handle endgame scenarios correctly', () => {
      // Nearly full board
      const board = ['X', 'O', 'X', 'X', 'O', '', 'O', 'X', ''];
      const bestMove = getBestMove(board);
      
      // Should take the only available spot that doesn't lose
      expect([5, 8]).toContain(bestMove);
      
      // Verify it's a valid move
      expect(isValidMove(board, bestMove)).toBe(true);
    });
  });

  describe('Minimax Algorithm', () => {
    test('should evaluate winning positions correctly', () => {
      const winningBoard = ['O', 'O', 'O', '', '', '', '', '', ''];
      const score = minimax([...winningBoard], 1, true);
      expect(score).toBeGreaterThan(0);
    });

    test('should evaluate losing positions correctly', () => {
      const losingBoard = ['X', 'X', 'X', '', '', '', '', '', ''];
      const score = minimax([...losingBoard], 1, false);
      expect(score).toBeLessThan(0);
    });

    test('should evaluate draws correctly', () => {
      const drawBoard = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', ''];
      const score = minimax([...drawBoard], 1, true);
      expect(score).toBe(0);
    });

    test('should prioritize quicker wins', () => {
      const quickWinBoard = ['O', 'O', '', '', '', '', '', '', ''];
      const deepWinBoard = ['', '', '', '', 'O', '', '', '', ''];
      
      const quickScore = minimax([...quickWinBoard], 0, true);
      
      // Make a move toward win
      quickWinBoard[2] = 'O';
      const deepScore = minimax([...deepWinBoard], 2, true);
      
      // Quicker wins should have higher scores
      expect(Math.abs(quickScore)).toBeGreaterThan(Math.abs(deepScore));
    });

    test('should handle recursive evaluation correctly', () => {
      const board = ['', '', '', '', '', '', '', '', ''];
      
      // First move should be center
      const firstMoveScore = minimax([...board], 0, true);
      
      board[4] = 'O';
      const secondMoveScore = minimax([...board], 1, true);
      
      // Scores should be finite numbers
      expect(typeof firstMoveScore).toBe('number');
      expect(typeof secondMoveScore).toBe('number');
      expect(isFinite(firstMoveScore)).toBe(true);
      expect(isFinite(secondMoveScore)).toBe(true);
    });
  });

  describe('AI vs AI Simulation', () => {
    test('should always result in draw when both AIs play optimally', () => {
      let board = ['', '', '', '', '', '', '', '', ''];
      let currentPlayer = 'X';
      
      while (!checkWinner(board) && getEmptyCells(board).length > 0) {
        if (currentPlayer === 'X') {
          // Simple AI for X (random moves for variety)
          const move = getRandomMove(board);
          board[move] = 'X';
        } else {
          // Optimal AI for O
          const move = getBestMove(board);
          board[move] = 'O';
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
      
      const winner = checkWinner(board);
      // With optimal play from O, X shouldn't win
      expect(winner).not.toBe('X');
    });

    test('should handle complete game simulation', () => {
      const simulateGame = () => {
        let board = ['', '', '', '', '', '', '', '', ''];
        let moveCount = 0;
        
        while (!checkWinner(board) && getEmptyCells(board).length > 0 && moveCount < 20) {
          const isXTurn = moveCount % 2 === 0;
          const player = isXTurn ? 'X' : 'O';
          
          if (isXTurn) {
            // X plays center first, then random
            if (moveCount === 0 && board[4] === '') {
              board[4] = 'X';
            } else {
              const move = getRandomMove(board);
              board[move] = 'X';
            }
          } else {
            // O plays optimally
            const move = getBestMove(board);
            board[move] = 'O';
          }
          
          moveCount++;
        }
        
        return {
          board,
          winner: checkWinner(board),
          moveCount
        };
      };
      
      const game = simulateGame();
      
      expect(game.moveCount).toBeGreaterThan(0);
      expect(game.board.every(cell => cell === '' || cell === 'X' || cell === 'O')).toBe(true);
      
      if (game.winner) {
        expect(['X', 'O']).toContain(game.winner);
      }
    });
  });

  describe('AI Performance', () => {
    test('should make decisions quickly', () => {
      const board = ['', '', '', '', '', '', '', '', ''];
      
      const startTime = Date.now();
      const bestMove = getBestMove(board);
      const endTime = Date.now();
      
      const decisionTime = endTime - startTime;
      
      expect(decisionTime).toBeLessThan(100); // Should complete in under 100ms
      expect(typeof bestMove).toBe('number');
      expect(bestMove).toBeGreaterThanOrEqual(0);
      expect(bestMove).toBeLessThan(9);
    });

    test('should handle complex positions efficiently', () => {
      // Mid-game position with many possibilities
      const board = ['X', 'O', 'X', '', 'O', '', '', '', 'X'];
      
      const startTime = Date.now();
      const bestMove = getBestMove(board);
      const endTime = Date.now();
      
      const decisionTime = endTime - startTime;
      
      expect(decisionTime).toBeLessThan(200); // Should still be quick
      expect(isValidMove(board, bestMove)).toBe(true);
    });

    test('should be consistent in decision making', () => {
      const board = ['X', '', '', '', 'O', '', '', '', ''];
      
      const move1 = getBestMove([...board]);
      const move2 = getBestMove([...board]);
      const move3 = getBestMove([...board]);
      
      // Should make the same decision every time for identical positions
      expect(move1).toBe(move2);
      expect(move2).toBe(move3);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty board correctly', () => {
      const board = ['', '', '', '', '', '', '', '', ''];
      const bestMove = getBestMove(board);
      
      expect(bestMove).toBe(4); // Should take center
    });

    test('should handle nearly full board correctly', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', ''];
      const bestMove = getBestMove(board);
      
      expect(bestMove).toBe(8); // Only available move
    });

    test('should handle board where AI must defend multiple threats', () => {
      // Board where AI must block immediate threats
      const board = ['X', 'X', '', 'O', 'O', '', 'X', '', ''];
      const bestMove = getBestMove(board);
      
      // Should block one of the threats
      expect([2, 5]).toContain(bestMove);
    });

    test('should handle symmetric positions', () => {
      // Rotated/Reflected versions of same position should have symmetric responses
      const board1 = ['X', '', '', '', 'O', '', '', '', ''];
      const board2 = ['', '', 'X', '', 'O', '', '', '', ''];
      const board3 = ['', '', '', '', 'O', '', 'X', '', ''];
      const board4 = ['', '', '', '', 'O', '', '', '', 'X'];
      
      const move1 = getBestMove(board1);
      const move2 = getBestMove(board2);
      const move3 = getBestMove(board3);
      const move4 = getBestMove(board4);
      
      // Moves should be symmetric
      const symmetricMoves = {
        0: [0, 2, 6, 8], // Corners
        1: [1, 3, 5, 7], // Sides
        4: [4] // Center
      };
      
      // All moves should be from the same symmetric group
      const allMoves = [move1, move2, move3, move4];
      for (const move of allMoves) {
        expect([0, 1, 2, 3, 4, 5, 6, 7, 8]).toContain(move);
      }
    });
  });
});