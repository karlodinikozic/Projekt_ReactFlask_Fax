import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Redirect} from 'react-router-dom'

function Login() {
    const [userJMBAG, setuserJMBAG] = useState(0);
    const [userRacunalo, setUserRacunalo] = useState(-1);
    const [students, setStudents] = useState({});
    const [loggedIn,setLoggedIn]=useState({});
  
    useEffect (()=>{
      axios.get("https://kdkman.pythonanywhere.com/students")
      .then(res=>{
        setStudents(res.data)
       
      })
    },[])



    const checkLogIn = (check) =>{
      
      let validity = {
        valid : true,
        msg : "",
        focusObject : null
      }

      if(check.JMBAG.length !== 10){
        validity.msg = "JMBAG MORA IMATI 10 Broja";
        validity.valid = false
        validity.focusObject = "JMBAG"
        return validity
        
      }

      const logginHelp = students.filter(student => {
        if(check.JMBAG === student.JMBAG){
          return student
        }
      })
      

       // TODO SET FOCUS na JMBAG 
       //checks if there are students with that jmbag
      if(logginHelp.length === 0){
        
        validity.msg = "Nepostoji student s tim JMBAGOM" ;
        validity.valid = false ;
        validity.focusObject = "JMBAG" ;
        return validity
      }


      let freeRac = !isNaN(check.br_racunala) && check.br_racunala>-1;


      // TODO SET FOCUS na Br_racunala
      if(! freeRac){
        validity.msg = "Broj racunala nije Valjan Broj" ;
        validity.valid = false ;
        validity.focusObject = "Br_racunala" ;
        return validity
      }

      //cheks if input br_rac is already occupay by another studnet
      students.forEach(student => {
        if(student.br_racunala === check.br_racunala){
          freeRac = false;
        }
      });

      if(!freeRac){
        validity.msg = "Racunalo je već iskorišteno" ;
        validity.valid = false ;
        validity.focusObject = "Br_racunala" ;
        return validity
      }

      return validity;
    }
 

    const logInHandler = ()=>{

      const logInObject = {
        JMBAG: userJMBAG,
        br_racunala : userRacunalo
      }

      const validity = checkLogIn(logInObject);
      if(validity.valid){
    
        axios.put("https://kdkman.pythonanywhere.com/login",logInObject)
        .then(res=>{
          setLoggedIn(res.data)
          console.log(res.data)
          
        })
        
      }
      else
      {
        //FOCUS ON validiti.focusobject
        console.log(validity.msg);
        console.log(validity.focusObject)
      }

    
    }
    
   

    
    return (
        <div>
                <h1>Welcome!</h1>
          <div  style={loginStyle}>
          {students.length > 0?
        <div>
           JMBAG: <input   type="text" placeholder="JMBAG" onChange={e => setuserJMBAG(e.target.value)}/>
          <br/>
           Broj Racunala: <input  type="text" placeholder="Broj Racunala" onChange={e => setUserRacunalo(e.target.value)}/>
           <br/>
            
           
          {loggedIn.is_logged_in?
         
              
              <Redirect to={{
                pathname :'/student',
                state : {JMBAG: loggedIn.JMBAG}
              }}/>
          :
            <button onClick={logInHandler}>Log In</button>
          }
        </div>
        :null
      }
          </div>
         

      {/* <PuniBazu/> */}
       </div>
    )
}

const loginStyle = {
  color: "white",
  border:"1px solid black",
  backgroundColor: "ligthgray",
  padding: "10px",
  fontFamily: "Arial"
}

export default Login
