import React, { useState, useEffect } from 'react';
import Board from './Board';

//Get mode from the App.js routing
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
          //A cell is empty
          isComplete = false;
        } else if (cell.currentState !== cell.correctState) {
          //A cell is wrong
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

  //Swap between highlighted and non-highighted states
  const highlightMistakesFunction = () => {
    setHighlightMistakes(prev => !prev); 
  };

  return (
    <>
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
    </>
  );
}

export default Game;
