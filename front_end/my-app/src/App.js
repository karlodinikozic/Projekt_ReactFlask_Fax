import React from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <h1>Welcome!</h1>
      <BrowserRouter>
    <Main />
  </BrowserRouter>
    </div>
  );
}

export default App;
