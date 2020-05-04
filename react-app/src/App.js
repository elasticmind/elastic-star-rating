import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Greeting } from './Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Greeting/>
        <p>
          This is my amazing React app. Not convinced? You have to rate it to see it!
        </p>
        <elastic-star-rating max-rating={10} style={{display: "block", position: "absolute", top: "0"}}></elastic-star-rating>
      </header>
    </div>
  );
}

export default App;
