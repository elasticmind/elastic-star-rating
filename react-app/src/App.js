import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Greeting } from './Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Greeting id={1234} />
        <p>
          This is my amazing React app. Not convinced? You have to rate it to see it!
        </p>
        <my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>
      </header>
    </div>
  );
}

export default App;
