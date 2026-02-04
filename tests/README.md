# Testing Guide

This project includes comprehensive test coverage for the Tic Tac Toe game.

## Test Structure

```
tests/
├── setup.js                    # Jest test environment setup
├── game-logic.js               # Extracted game logic for testing
├── test-utils.js               # Test utilities and helpers
├── game-logic.test.js          # Unit tests for game logic
├── dom-interaction.test.js     # DOM integration tests
├── e2e-game-flow.test.js       # End-to-end game flow tests
├── ai-strategy.test.js         # AI strategy and performance tests
└── responsive-design.test.js   # Responsive design tests
```

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## Test Categories

### 1. Unit Tests (`game-logic.test.js`)
Tests core game logic functions:
- Win pattern detection
- Game state validation
- Move validation
- AI minimax algorithm
- Score tracking

### 2. DOM Integration Tests (`dom-interaction.test.js`)
Tests DOM manipulation and interactions:
- Board rendering
- Cell interactions
- Modal display
- Score updates
- Mode selection

### 3. End-to-End Tests (`e2e-game-flow.test.js`)
Tests complete game scenarios:
- Full game completion
- Win/draw scenarios
- Game reset functionality
- Score tracking across games
- Mode switching

### 4. AI Strategy Tests (`ai-strategy.test.js`)
Tests AI decision-making:
- Optimal move selection
- Win/block move detection
- Fork creation and prevention
- Performance benchmarking
- Edge case handling

### 5. Responsive Design Tests (`responsive-design.test.js`)
Tests mobile and desktop compatibility:
- Viewport adaptation
- Touch target sizing
- Orientation changes
- Performance on different devices
- Accessibility considerations

## Test Coverage

The test suite provides comprehensive coverage for:

- ✅ Game logic and rules
- ✅ User interactions
- ✅ AI behavior and strategy
- ✅ Responsive design
- ✅ Error handling
- ✅ Performance optimization
- ✅ Accessibility features

## Writing New Tests

### Import Test Utilities
```javascript
import { 
  createMockBoard, 
  renderMockBoard, 
  mockClickEvent,
  createMockGameState 
} from './test-utils.js';
```

### Basic Test Structure
```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    createMockBoard();
    // Setup test state
  });

  test('should do something', () => {
    // Test implementation
  });
});
```

### Mocking DOM Events
```javascript
test('should handle cell click', () => {
  const cells = renderMockBoard();
  mockClickEvent(cells[0]);
  // Assertions
});
```

### Testing AI Behavior
```javascript
test('should make optimal move', () => {
  const board = ['X', 'X', '', '', '', '', '', '', ''];
  const bestMove = getBestMove(board);
  expect(bestMove).toBe(2);
});
```

## Continuous Integration

These tests are designed to run in CI/CD environments:

- Headless browser testing with jsdom
- No external dependencies required
- Fast execution times
- Comprehensive coverage reports

## Performance Benchmarks

AI strategy tests include performance validation:
- Decision time < 100ms for simple positions
- Decision time < 200ms for complex positions
- Consistent decision-making for identical positions

## Accessibility Testing

Responsive design tests include accessibility validation:
- Touch targets ≥ 44px (Apple guidelines)
- Readable font sizes on all viewports
- Maintained functionality across orientations

## Debugging Failed Tests

### Console Output
Tests include detailed console logging for debugging:
- Game state changes
- DOM updates
- AI decision processes

### Visual Testing
Use browser dev tools to inspect:
- DOM structure during tests
- CSS calculations
- Responsive breakpoints

### Test Utilities
Helper functions for common testing patterns:
- Mock game state creation
- DOM event simulation
- Viewport mocking
- Assertion helpers