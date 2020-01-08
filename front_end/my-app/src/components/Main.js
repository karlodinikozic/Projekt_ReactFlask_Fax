import React from 'react'
import Login from './Login'
import Header from './Header'
import {Link,Route,BrowserRouter as Router, Switch} from 'react-router-dom'
import Student from './Student'

function Main() {
    return (
      <div>
      <Router>
       
       <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/student"  component={Student}/>

       </Switch>
       
      </Router>
      </div>
    )
}


export default Main
