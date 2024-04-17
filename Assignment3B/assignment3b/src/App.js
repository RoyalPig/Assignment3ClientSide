import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    //Router for the diffrences in game modes
    <Router>
      <div className="App">
        <h1>Three-in-a-Row Game</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/sample">Sample Game</Link> | <Link to="/random">Random Game</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sample" element={<Game mode="sample" />} />
          <Route path="/random" element={<Game mode="random" />} />
        </Routes> 
      </div>
    </Router>
  );
}

//Route to here if user clicks home
function Home() {
  return <>Welcome to the Three-in-a-Row Game! Select a mode to begin.</>;
}

export default App;

