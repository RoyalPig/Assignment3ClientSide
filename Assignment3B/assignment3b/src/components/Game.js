import React, { useState, useEffect } from 'react';
import Board from './Board';

function Game({ mode }) {
  const [data, setData] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [highlightMistakes, setHighlightMistakes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      const url = mode === "sample" 
        ? "https://prog2700.onrender.com/threeinarow/sample" 
        : "https://prog2700.onrender.com/threeinarow/random";
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching puzzle data:", error);
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [mode]);

  const handleSquareClick = (rowIndex, cellIndex, newState) => {
    setData(prevData => {
      const newData = {
        ...prevData,
        rows: prevData.rows.map((row, rIdx) => {
          if (rIdx === rowIndex) {
            return row.map((cell, cIdx) => {
              if (cIdx === cellIndex) {
                return { ...cell, currentState: newState };
              }
              return cell;
            });
          }
          return row;
        }),
      };
      return newData;
    });
  };
  
  const checkPuzzle = () => {
    let isComplete = true;
    let somethingIsWrong = false;
  
    data.rows.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell.currentState === 0) {
          isComplete = false;
        } else if (cell.currentState !== cell.correctState) {
          somethingIsWrong = true;
        }
      });
    });
  
    if (somethingIsWrong) {
      setStatusMessage('Something is wrong');
    } else if (!isComplete) {
      setStatusMessage('So far so good');
    } else {
      setStatusMessage('You did it!!');
    }
  };
  const highlightMistakesFunction = () => {
    setHighlightMistakes(prev => !prev); 
  };


  return (
    <div>
      {isLoading ? (
        <div>Loading puzzle...</div> 
      ) : (
        data && 
          <Board
            rows={data.rows}
            onSquareClick={handleSquareClick}
            highlightMistakes={highlightMistakes} 
          />
        
      )}
      <label>
        <input
          type="checkbox"
          checked={highlightMistakes}
          onChange={highlightMistakesFunction}
        />
        Highlight mistakes
      </label>

      <button onClick={checkPuzzle} disabled={isLoading}>Check Puzzle</button>
      <div>{statusMessage}</div>
    </div>
  );
}

export default Game;
