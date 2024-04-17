// Square Component -f or a single Square in the Board
export default function Square({ value, onSquareClick }) {
    return     <button className="square" onClick={onSquareClick}>{value}</button>;
  }
  