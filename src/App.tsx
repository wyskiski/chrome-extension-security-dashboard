import React from 'react';
import logo from './logo.svg';
import './App.css';
import reloadIcon from '../public/assets/reload.png'

function App() {
  return (
    <div className="App">
      <div id="header">
        <p>Cookie Checker</p>
        <img id="reloadIcon" src='/public/assets/reload.png' alt="reload"/>
      </div>
      <div id="cookieInformation">
        <div className="noCookies">
          <p id="malicious">Malicious: 00</p>
        </div>
        <div className="noCookies">
          <p>Total Cookies Found: 00</p>
        </div>
      </div>
      <div id="buttons">ssssss
        <button>view cookies</button>
        <button>clear cookies</button>
      </div>

      <div id="footer">
        <p>Built by Winona Wrigley. 2025.</p>
      </div>
    </div>
  );
}

export default App;
