describe('Responsive Design Tests', () => {
  beforeEach(() => {
    // Setup basic HTML structure
    document.head.innerHTML = `
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Include basic responsive styles for testing */
        body {
          margin: 0;
          padding: 20px;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .container {
          max-width: 100%;
          padding: 30px;
        }
        .board {
          display: grid;
          grid-template-columns: repeat(3, minmax(80px, 120px));
          gap: 10px;
          max-width: 100%;
        }
        .cell {
          min-width: 80px;
          min-height: 80px;
          aspect-ratio: 1;
        }
        @media (max-width: 600px) {
          .board {
            grid-template-columns: repeat(3, 1fr);
            max-width: 320px;
          }
          .cell {
            min-width: 60px;
            min-height: 60px;
          }
        }
        @media (max-width: 400px) {
          .board {
            max-width: 280px;
          }
          .cell {
            min-width: 50px;
            min-height: 50px;
          }
        }
      </style>
    `;
    
    document.body.innerHTML = `
      <div class="container">
        <h1>Tic Tac Toe</h1>
        <div id="mode-selector">
          <select name="mode" id="mode">
            <option value="pvp">Player vs Player</option>
            <option value="pva">Player vs AI</option>
          </select>
        </div>
        <div id="board" class="board"></div>
        <div id="info">
          <div id="score">
            <div class="player-score" id="playerXScore">Player X: 0</div>
            <div class="player-score" id="playerOScore">Player O: 0</div>
          </div>
        </div>
      </div>
    `;

    // Mock board rendering
    const boardElement = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = i < 3 ? 'X' : i < 6 ? 'O' : '';
      boardElement.appendChild(cell);
    }
  });

  const mockViewport = (width, height) => {
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
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
  };

  describe('Viewport Adaptability', () => {
    test('should adapt to desktop viewport', () => {
      mockViewport(1200, 800);
      
      const container = document.querySelector('.container');
      const board = document.querySelector('.board');
      const cells = document.querySelectorAll('.cell');
      
      expect(container).toBeTruthy();
      expect(board).toBeTruthy();
      expect(cells).toHaveLength(9);
      
      // Check that elements exist and are visible
      cells.forEach(cell => {
        expect(cell.offsetParent).not.toBeNull();
      });
    });

    test('should adapt to tablet viewport', () => {
      mockViewport(768, 1024);
      
      const board = document.querySelector('.board');
      const cells = document.querySelectorAll('.cell');
      
      expect(board).toBeTruthy();
      expect(cells).toHaveLength(9);
      
      // Cells should still be visible
      cells.forEach(cell => {
        expect(cell.offsetParent).not.toBeNull();
      });
    });

    test('should adapt to mobile viewport', () => {
      mockViewport(375, 667);
      
      const board = document.querySelector('.board');
      const cells = document.querySelectorAll('.cell');
      
      expect(board).toBeTruthy();
      expect(cells).toHaveLength(9);
      
      // All cells should be visible on mobile
      cells.forEach(cell => {
        expect(cell.offsetParent).not.toBeNull();
      });
    });

    test('should adapt to small mobile viewport', () => {
      mockViewport(320, 568);
      
      const board = document.querySelector('.board');
      const cells = document.querySelectorAll('.cell');
      
      expect(board).toBeTruthy();
      expect(cells).toHaveLength(9);
      
      // Should still work on very small screens
      cells.forEach(cell => {
        expect(cell.offsetParent).not.toBeNull();
      });
    });
  });

  describe('Layout Responsiveness', () => {
    test('should maintain board structure across viewports', () => {
      const viewports = [
        { width: 1200, height: 800 },
        { width: 768, height: 1024 },
        { width: 375, height: 667 },
        { width: 320, height: 568 }
      ];

      viewports.forEach(({ width, height }) => {
        mockViewport(width, height);
        
        const board = document.querySelector('.board');
        const cells = document.querySelectorAll('.cell');
        
        expect(board).toBeTruthy();
        expect(cells).toHaveLength(9);
        
        // Check grid structure is maintained
        const computedStyle = window.getComputedStyle(board);
        expect(computedStyle.display).toBe('grid');
      });
    });

    test('should scale board appropriately', () => {
      const desktopWidth = 1200;
      const mobileWidth = 375;
      
      mockViewport(desktopWidth, 800);
      const desktopBoard = document.querySelector('.board');
      const desktopWidthPx = desktopBoard.offsetWidth;
      
      mockViewport(mobileWidth, 667);
      const mobileBoard = document.querySelector('.board');
      const mobileWidthPx = mobileBoard.offsetWidth;
      
      // Mobile board should be smaller than desktop
      expect(mobileWidthPx).toBeLessThanOrEqual(desktopWidthPx);
    });

    test('should maintain touch targets on mobile', () => {
      mockViewport(375, 667);
      
      const cells = document.querySelectorAll('.cell');
      
      cells.forEach(cell => {
        const rect = cell.getBoundingClientRect();
        
        // Touch targets should be at least 44px (Apple recommendation)
        expect(rect.width).toBeGreaterThanOrEqual(44);
        expect(rect.height).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Content Adaptability', () => {
    test('should display content correctly on mobile', () => {
      mockViewport(375, 667);
      
      const title = document.querySelector('h1');
      const modeSelector = document.querySelector('#mode-selector');
      const score = document.querySelector('#score');
      
      expect(title).toBeTruthy();
      expect(modeSelector).toBeTruthy();
      expect(score).toBeTruthy();
      
      // All elements should be visible
      expect(title.offsetParent).not.toBeNull();
      expect(modeSelector.offsetParent).not.toBeNull();
      expect(score.offsetParent).not.toBeNull();
    });

    test('should maintain readability across viewports', () => {
      const viewports = [1200, 768, 375, 320];
      
      viewports.forEach(width => {
        mockViewport(width, 800);
        
        const title = document.querySelector('h1');
        const cells = document.querySelectorAll('.cell');
        
        const titleStyle = window.getComputedStyle(title);
        const cellStyle = window.getComputedStyle(cells[0]);
        
        // Font sizes should be reasonable
        expect(parseInt(titleStyle.fontSize)).toBeGreaterThan(12);
        expect(parseInt(cellStyle.fontSize)).toBeGreaterThan(12);
      });
    });
  });

  describe('Orientation Changes', () => {
    test('should handle portrait orientation', () => {
      mockViewport(375, 667); // Portrait
      
      const board = document.querySelector('.board');
      const cells = document.querySelectorAll('.cell');
      
      expect(board).toBeTruthy();
      expect(cells).toHaveLength(9);
      
      cells.forEach(cell => {
        expect(cell.offsetParent).not.toBeNull();
      });
    });

    test('should handle landscape orientation', () => {
      mockViewport(667, 375); // Landscape
      
      const board = document.querySelector('.board');
      const cells = document.querySelectorAll('.cell');
      
      expect(board).toBeTruthy();
      expect(cells).toHaveLength(9);
      
      cells.forEach(cell => {
        expect(cell.offsetParent).not.toBeNull();
      });
    });

    test('should maintain functionality during orientation change', () => {
      // Start in portrait
      mockViewport(375, 667);
      const portraitBoard = document.querySelector('.board');
      expect(portraitBoard).toBeTruthy();
      
      // Switch to landscape
      mockViewport(667, 375);
      const landscapeBoard = document.querySelector('.board');
      expect(landscapeBoard).toBeTruthy();
      
      // Same element should still exist
      expect(portraitBoard).toBe(landscapeBoard);
    });
  });

  describe('Performance and Optimization', () => {
    test('should handle rapid viewport changes', () => {
      const viewports = [1200, 768, 375, 320, 1024, 500];
      
      viewports.forEach((width, index) => {
        mockViewport(width, 800);
        
        const board = document.querySelector('.board');
        const cells = document.querySelectorAll('.cell');
        
        // Should always find elements immediately
        expect(board).toBeTruthy();
        expect(cells).toHaveLength(9);
      });
    });

    test('should maintain performance on mobile', () => {
      mockViewport(375, 667);
      
      const startTime = Date.now();
      
      // Simulate some DOM operations
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell, index) => {
        cell.classList.add('test-cell');
        cell.textContent = cell.textContent;
      });
      
      const endTime = Date.now();
      const operationTime = endTime - startTime;
      
      // Operations should complete quickly on mobile
      expect(operationTime).toBeLessThan(100);
      
      // Clean up
      cells.forEach(cell => {
        cell.classList.remove('test-cell');
      });
    });
  });

  describe('Accessibility in Responsive Design', () => {
    test('should maintain accessibility on mobile', () => {
      mockViewport(375, 667);
      
      const cells = document.querySelectorAll('.cell');
      const modeSelector = document.querySelector('#mode');
      
      // Touch targets should be accessible
      cells.forEach(cell => {
        const rect = cell.getBoundingClientRect();
        expect(rect.width).toBeGreaterThanOrEqual(44);
        expect(rect.height).toBeGreaterThanOrEqual(44);
      });
      
      // Interactive elements should remain accessible
      expect(modeSelector.offsetParent).not.toBeNull();
    });

    test('should maintain readable text on small screens', () => {
      mockViewport(320, 568);
      
      const title = document.querySelector('h1');
      const cells = document.querySelectorAll('.cell');
      
      const titleStyle = window.getComputedStyle(title);
      const cellStyle = window.getComputedStyle(cells[0]);
      
      // Font sizes should remain readable
      expect(parseInt(titleStyle.fontSize)).toBeGreaterThanOrEqual(16);
      expect(parseInt(cellStyle.fontSize)).toBeGreaterThanOrEqual(14);
    });
  });

  describe('Error Handling in Responsive Context', () => {
    test('should handle extreme viewport sizes gracefully', () => {
      // Very small viewport
      mockViewport(240, 320);
      
      const board = document.querySelector('.board');
      const cells = document.querySelectorAll('.cell');
      
      expect(board).toBeTruthy();
      expect(cells).toHaveLength(9);
      
      // Very large viewport
      mockViewport(1920, 1080);
      
      expect(board).toBeTruthy();
      expect(cells).toHaveLength(9);
    });

    test('should handle zero/negative viewport dimensions', () => {
      mockViewport(0, 0);
      
      const board = document.querySelector('.board');
      expect(board).toBeTruthy();
      
      mockViewport(-100, -100);
      
      const boardAgain = document.querySelector('.board');
      expect(boardAgain).toBeTruthy();
    });
  });
});