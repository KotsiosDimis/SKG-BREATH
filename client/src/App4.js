import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message)) // <-- use data.message
      .catch((err) => console.error('Error:', err));
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        {/* Existing CRA spinning logo */}
        <img src={logo} className="App-logo" alt="logo" />

        {/* Default CRA text */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        {/* Our integrated message from the server */}
        <p>Server says: {message}</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
