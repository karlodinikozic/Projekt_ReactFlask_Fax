import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <div style={centerMid} className="App">
     <Main></Main>
    </div>
  );
}

const centerMid={
  maring:"0 auto"
}
export default App;
