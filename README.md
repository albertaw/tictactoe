# Tic Tac Toe

Two players take turns marking a 3 x 3 board with an X or an O until one player gets three marks in a row. The first player to start the game is player X. In single player mode, the human player is X and the computer is O. 

View the live demo [here]( https://alberta-tictactoe-d971d09a34ae.herokuapp.com/).

### Computer algorithm

The board’s state is represented as a 3 x 3 matrix. Elements with the value `0` mean a square is free. Otherwise, elements have the value of the player’s mark. Values are assigned to the free squares to rank the priority the computer should use when selecting a move. A value of `2` means the computer wins if making this move. A value of `1` means player X is blocked from winning. And a value of `0` means the move is neutral. In difficult mode, the computer will always select the move that has the highest value. In easy mode, the computer will select a random square two out of four moves.

## Getting started

### Pre conditions

Node.js is installed  
Download: https://nodejs.org/en

### Clone the repo

```bash
git clone git@github.com:albertaw/tictactoe.git
```

### Navigate into project root

```bash
cd tictactoe
```

### Install dependencies

```bash
npm install
```
### Open app

```bash
npm start
```

Navigate your browser window to `localhost:8080` to see a demo.

## Testing

Jest is used for unit testing. To run the unit tests use the following command:

```bash
npm run test
```
