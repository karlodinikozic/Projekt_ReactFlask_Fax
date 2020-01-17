import React from 'react'
import Login from './Login'
import Header from './Header'
import {Link,Route,BrowserRouter as Router, Switch} from 'react-router-dom'
import Student from './Student'
import {Container} from 'react-bootstrap'

function Main() {
    return (
      <Container>
        
      <Router>
       
       <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/student"  component={Student}/>

       </Switch>
       
      </Router>
      </Container>
    )
}


export default Main
