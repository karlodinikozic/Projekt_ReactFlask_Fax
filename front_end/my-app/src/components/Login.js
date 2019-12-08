import React,{useState,useEffect} from 'react'
import axios from 'axios'
import PuniBazu from './PuniBazu';

function Login() {
    const [userJMBAG, setuserJMBAG] = useState(0);
    const [userRacunalo, setUserRacunalo] = useState(-1);
    const [students, setStudents] = useState({});
    const [loggedIn,setLoggedIn]=useState({});
  
    useEffect (()=>{
      axios.get("http://127.0.0.1:5000/students")
      .then(res=>{
        setStudents(res.data)
       
      })
    },[])


    const logInHandler = ()=>{
      const logInObject = {
        JMBAG: userJMBAG,
        br_racunala : userRacunalo
      }
      axios.put("http://127.0.0.1:5000/login",logInObject)
      .then(res=>{
        setLoggedIn(res.data)
        console.log(res.data)
      })
    }
    
    const logOutHandler = ()=>{
      const logOut = {
        JMBAG: loggedIn.JMBAG,
      }
      axios.put("http://127.0.0.1:5000/logOut",logOut)
      .then(res=>{
        setLoggedIn({})
      })
    }

    
    return (
        <div>
          <div  style={loginStyle}>
          {students.length > 0?
        <div>
           JMBAG: <input  type="text" placeholder="JMBAG" onChange={e => setuserJMBAG(e.target.value)}/>
          <br/>
           Broj Racunala: <input  type="text" placeholder="Broj Racunala" onChange={e => setUserRacunalo(e.target.value)}/>
           <br/>
           
          {loggedIn.is_logged_in?
            <button onClick={logOutHandler}>Log Out</button>
          :
            <button onClick={logInHandler}>Login</button>
          }
        </div>
        :null
      }
          </div>
         

      <PuniBazu/>
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
