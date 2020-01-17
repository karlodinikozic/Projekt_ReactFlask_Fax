import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Form, Col, Button, Spinner, Container} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import PuniBazu from './PuniBazu';

function Login() {
    const [userJMBAG, setuserJMBAG] = useState(0);
    const [userRacunalo, setUserRacunalo] = useState(-1);
    const [students, setStudents] = useState({});
    const [loggedIn,setLoggedIn]=useState({});
    const [wrongCredentials,setWrongCredentials] = useState(false)

  
    useEffect (()=>{
      axios
      .get("https://kdkman.pythonanywhere.com/students")
      .then(res=>{ setStudents(res.data) })

    },[])

    

    const checkIfJMBAGexists = ()=>{
      return students.filter(student => {

      
        if(student.JMBAG === userJMBAG){
          
          return student
        }
      }).length === 1;

     
    }

    const checkIfRacisInUse = ()=>{
      let freeRac=true
      students.forEach(student => {
        if(student.br_racunala === userRacunalo){
          freeRac = false;
        }
      });
      return freeRac
    }


    const [validated, setValidated] = useState(false);
    const handleSubmit = () => {
      setValidated(true)
      const test = checkIfRacisInUse() && checkIfJMBAGexists()
      if(test){
        
        axios
        .put("https://kdkman.pythonanywhere.com/login",{JMBAG:userJMBAG,br_racunala:userRacunalo})
        .then(res=>{
          setLoggedIn(res.data)
          console.log(res.data)  
        })
      }
      else if(userJMBAG !=0 && userRacunalo!=-1 ){
        setWrongCredentials(true)
      }
      else{
        setWrongCredentials(false)
      }
      
    };
    
   

    
    return (
        <Container>
        <h1>Welcome!</h1>
        {students.length>0?
        <Col>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Please Enter your JMBAG</Form.Label>
              <Form.Control
                  onChange={e => setuserJMBAG(e.target.value)}
                  required
                  type="text"
                  placeholder="JMBAG"
                  pattern="[0-9]{10}"
              />
              <Form.Control.Feedback type="invalid"> Please enter a valid JMBAG.</Form.Control.Feedback>
              </Form.Group>
          </Form.Row>
          <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Please Enter number of your PC </Form.Label>
              <Form.Control
                  onChange={e => setUserRacunalo(e.target.value)}
                  required
                  type="number"
                  placeholder="Br Racunala"
                  min="1"
                  max="999"
                 
              />
              <Form.Control.Feedback type="invalid"> Please enter a valid number of PC.</Form.Control.Feedback>
              </Form.Group>
          </Form.Row>
          <Form.Row>
          {loggedIn.is_logged_in?     
          <Redirect to={{
            pathname :'/student',
            state : {JMBAG: loggedIn.JMBAG}
          }}/>
            :
            <Button onClick={handleSubmit}>Log In</Button>
          }
          </Form.Row>
        </Form>
        {
           wrongCredentials?
           <Container>
               <h1>Wrong Credentials</h1>
            </Container>
            :
            null
       }

          

        </Col>
        :
        <Spinner/>
        }
              


      <PuniBazu students= {students}/>
       </Container>
    )
}


export default Login
