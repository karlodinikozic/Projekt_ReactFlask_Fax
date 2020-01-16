import React from 'react'
import {Link,Route,BrowserRouter as Router, Switch} from 'react-router-dom'
import HomePage from './HomePage'
import Login from './Login'
import { Container, Jumbotron } from 'react-bootstrap'


function Main() {
    return (
        <Container>
            <Jumbotron>
            <Router>
       
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home"  component={HomePage}/>

            </Switch>
            
            </Router>
            </Jumbotron>
        </Container>
    )
}

export default Main
