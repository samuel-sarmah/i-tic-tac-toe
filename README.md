# Tic Tac Toe

A modern, responsive Tic Tac Toe game with intelligent AI opponent and comprehensive testing suite. 

![project screenshot](<Screenshot 2026-02-04 at 10-07-05 Tic Tac Toe.png>)

## Features

### Gameplay
- **Two Game Modes**: Player vs Player and Player vs AI
- **Smart AI**: Uses minimax algorithm for optimal play
- **Score Tracking**: Persistent score counter for both players
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Win Detection**: Automatic detection of wins, draws, and game endings
- **Visual Feedback**: Highlighted winning combinations and smooth animations

### Technical Features
- **Pure Vanilla JavaScript**: No framework dependencies
- **Responsive CSS**: Mobile-first design with flexible layouts
- **Modular Architecture**: Clean, maintainable code structure
- **Comprehensive Testing**: 100+ tests covering all functionality
- **Performance Optimized**: Fast AI decision-making and smooth UI

## Quick Start

### Play Online
Open `index.html` in your browser to start playing immediately.

### Development Setup
```bash
# Clone the repository
git clone git@github.com:samuel-sarmah/i-tic-tac-toe.git

cd i-tic-tac-toe

# Install dependencies (for testing)
npm install

# Start development server
npm run server
```

### Mobile Optimizations
- Touch-friendly targets (minimum 44px)
- Optimized font sizes for readability
- Smooth animations and transitions
- Portrait and landscape orientation support

## AI Opponent

The AI opponent uses the **minimax algorithm** with alpha-beta pruning for optimal play:

### AI Strategy
1. **Win Detection**: Takes winning moves when available
2. **Block Defense**: Blocks opponent's winning moves
3. **Strategic Positioning**: Prefers center, then corners
4. **Fork Creation**: Creates multiple winning opportunities
5. **Fork Prevention**: Blocks opponent's fork attempts

### Difficulty Levels
- **Easy**: Random moves for beginners
- **Hard**: Optimal minimax play for experienced players

## Testing

This project includes a comprehensive test suite covering:

### Test Categories
- **Unit Tests**: Core game logic and algorithms
- **Integration Tests**: DOM interactions and UI components
- **End-to-End Tests**: Complete game flows and scenarios
- **AI Strategy Tests**: Decision-making and performance
- **Responsive Tests**: Mobile and desktop compatibility

### Running Tests
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```


### Basic Rules
1. Players take turns placing X's and O's on a 3×3 grid
2. First player to get 3 in a row (horizontal, vertical, or diagonal) wins
3. If all 9 squares are filled without a winner, the game is a draw

### Controls
- **Click cell** to place your mark
- **Select game mode** using the dropdown
- **Play Again** button appears after each game ends
- **Score tracking** persists across games and mode changes

## Project Structure

```
i-tic-tac-toe/
├── index.html              
├── script.js               
├── styles.css              
├── tests/                 
│   ├── game-logic.test.js 
│   ├── dom-interaction.test.js 
│   ├── e2e-game-flow.test.js 
│   ├── ai-strategy.test.js 
│   ├── responsive-design.test.js 
│   └── test-utils.js       
├── package.json           
└── README.md             
```

## Technical Details

### Core Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Flexbox, Grid, and custom properties
- **Vanilla JavaScript**: ES6+ features with modular design
- **Jest**: Testing framework with DOM simulation

### Performance
- **Optimized Rendering**: Efficient DOM manipulation
- **Fast AI**: Minimax decisions under 100ms
- **Lightweight**: No external dependencies for game
- **Smooth Animations**: CSS transforms for 60fps performance

## Deployment

### Static Hosting
The game works out-of-the-box on any static hosting service:

- **GitHub Pages**: Free hosting for public repositories
- **Netlify**: Drag-and-drop deployment
- **Vercel**: Zero-config deployment
- **Firebase Hosting**: Free tier available

### Local Development
```bash
# Serve locally (Node.js required)
npx http-server . -p 8080

# Or use any live server extension in your code editor
```

## Contributing

### Development Guidelines
1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature-name`
3. **Add tests** for new functionality
4. **Ensure all tests pass**: `npm test`
5. **Commit changes**: `git commit -m "Add feature"`
6. **Push branch**: `git push origin feature-name`
7. **Submit pull request**


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Minimax Algorithm**: Classic game theory solution
- **Responsive Design**: Mobile-first development principles
- **Testing Best Practices**: Comprehensive test coverage
- **Accessibility Guidelines**: WCAG compliance standards

---

**Enjoy playing Tic Tac Toe!** 

If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.