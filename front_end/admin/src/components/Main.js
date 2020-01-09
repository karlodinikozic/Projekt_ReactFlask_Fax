import React from 'react'
import {Link,Route,BrowserRouter as Router, Switch} from 'react-router-dom'
import HomePage from './HomePage'
import Login from './Login'


function Main() {
    return (
        <div>
            <Router>
       
       <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/home"  component={HomePage}/>

       </Switch>
       
      </Router>
        </div>
    )
}

export default Main
