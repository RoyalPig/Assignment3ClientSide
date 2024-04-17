import Board from "./Board";
import { useState } from 'react'; // destructure useState from react library

// Stateful
export default function Game() {

    // STATE variables
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
  
    const currentSquares = history[currentMove];
  
  
    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);    
    }
  
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
    }
  
    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });

    function MoveCounter({ history, moveCount }) {
        let xCount = 0;
        let oCount = 0;
        
        // Since the game starts with X, we start counting from the second move (i.e., index 1)
        for (let i = 1; i <= moveCount; i++) {
            if (i % 2 !== 0) {
                xCount++;
            } else {
                oCount++;
            }
        }
    
        return <p>Moves - X: {xCount}, O: {oCount}</p>;
    }
    
  
    return (
        <div className="game">
          <div className="game-layout"> {}
            <div className="game-board">
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
              <ol>{moves}</ol>
            </div>
            <div className="move-counter">
              <MoveCounter history={history} moveCount={currentMove} />
            </div>
          </div>
        </div>
      );
  }
  