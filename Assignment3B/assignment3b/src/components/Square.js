import React from 'react';

function Square({ currentState, onClick, canToggle, highlight }) {
  const getColorForState = (currentState) => {
    switch (currentState) {
      case 0: return 'grey';
      case 1: return 'black';
      case 2: return 'blue';
      default: return 'green';
    }
  };
  
  //Prevents user from clicking a square that started there from the url
  const handleClick = () => {
    if (canToggle) {
      onClick();
    }
  };

  return (
    <button
      className="square"
      onClick={handleClick}
      style={{
        backgroundColor: getColorForState(currentState),
        border: highlight ? '2px solid red' : '1px solid #999'
      }}
    />
  );
}

export default Square;
