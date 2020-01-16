import React, { useEffect,useState } from 'react'
import { Form, Col, Button, Container } from 'react-bootstrap'

function Login(props) {

    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    



    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        console.log("hey")
      const form = event.currentTarget;
      
      setValidated(true);
      if(username === "admin" && password == "123"){
        console.log("Admin Loging Success")
        props.history.push('/home')
    }
    };
    

    return (
        <div>
                <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Please Enter your Username</Form.Label>
            <Form.Control
                onChange={(e)=>setUsername(e.target.value)}
                required
                type="text"
                placeholder="First name"
                minLength="3"
                maxLength="14"
            />
            <Form.Control.Feedback type="invalid"> Please enter a valid username.</Form.Control.Feedback>
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Please Enter your Password</Form.Label>
            <Form.Control
                onChange={(e)=>setPassword(e.target.value)}
                required
                type="password"
                placeholder="Password"
                minLength="3"
                maxLength="14"
            />
            <Form.Control.Feedback type="invalid"> Please enter a valid password.</Form.Control.Feedback>
            </Form.Group>
        </Form.Row>
        <Form.Row>
        <Button onClick={handleSubmit}>Log in</Button>
        </Form.Row>
       
        </Form>
        </Container>
           
        </div>
    )
}



export default Login
