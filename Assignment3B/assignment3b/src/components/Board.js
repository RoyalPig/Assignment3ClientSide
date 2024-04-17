import React, { useState } from 'react';
import Square from './Square';

function Board({ rows, onSquareClick, highlightMistakes }) { 
  const [squares, setSquares] = useState(rows);
  const handleSquareClick = (rowIndex, cellIndex) => {
    setSquares((prevSquares) => {
      const newSquares = prevSquares.map((row, rIdx) => {
        if (rIdx === rowIndex) {
          return row.map((cell, cIdx) => {
            if (cIdx === cellIndex && cell.canToggle) {
              console.log(`Cell at ${rIdx},${cIdx} current state: ${cell.currentState}, new state: ${(cell.currentState + 1) % 3}`);
              return { ...cell, currentState: (cell.currentState + 1) % 3 };
            }
            return cell;
          });
        }
        return row;
      });

      onSquareClick(rowIndex, cellIndex, newSquares[rowIndex][cellIndex].currentState);

      return newSquares;
    });
  };

  return (
    <div className="board">
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, cellIndex) => (
            <Square
              key={cellIndex}
              currentState={cell.currentState}
              correctState={cell.correctState}

              canToggle={cell.canToggle}
              onClick={() => handleSquareClick(rowIndex, cellIndex)}
              highlight={highlightMistakes && cell.currentState !== cell.correctState && cell.currentState !== 0}
              />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
