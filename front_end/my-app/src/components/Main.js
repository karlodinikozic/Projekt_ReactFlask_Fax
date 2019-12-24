import React from 'react'
import Login from './Login'
import Header from './Header'
import {Link,Route,Router} from 'react-router-dom'
import Student from './Student'

function Main() {
    return (
        <div style={{backgroundColor: "gray",height:"300px"}}>
            <Header/>
            <Login/>

            <header>
      <p>React Router v4 Browser Example</p>
        <nav>
           
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/studnet'>studnet</Link></li>

          </ul>
        </nav>
    </header>
    <div className="container">
      <Router>
        <Route path="/" exact component={HomePage} />
      
      <Route path="/studnet" component={Student} />
    
      </Router>
    </div>

        </div>
    )
}

const HomePage = () => <div>This is a Home Page</div>

const ProfilePage = () => <div>This is the Profile Page</div>

export default Main
