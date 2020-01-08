import React from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Test1 from './components/Test1';
import Test2 from './components/Test2';


function App() {
  return (
    <div className="App">

      <Main></Main>
    </div>
  );
}

export default App;
