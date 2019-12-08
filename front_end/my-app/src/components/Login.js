import React,{useState,useEffect} from 'react'
import axios from 'axios'
import PuniBazu from './PuniBazu';

function Login() {
    const [userJMBAG, setuserJMBAG] = useState(0);
    const [students, setStudents] = useState({});
  
    useEffect (()=>{
      axios.get("http://127.0.0.1:5000/students")
      .then(res=>{
        setStudents(res.data)
       
      })
    },[])

    
    return (
        <div style={{backgroundColor: "pink",height: "100px"}}>
          {students.length > 0?
        <div>
          {students.map(student=>
          <div>{console.log(student)  }
            <h1>{student.ime} {student.prezime}</h1>
            <h2>{student.JMBAG}</h2>
            <input type="checkbox" checked={student.is_logged_in}/>Ulogiran
            
            </div>
          )}
        </div>
        :null
      }

      <PuniBazu/>
       </div>
    )
}

export default Login
