import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import HelpButton from './HelpButton';

function Student(props) {
    const JMBAG = props.location.state.JMBAG
    
    const [student,setStudent]=useState({});



    useEffect(()=>{
        console.log(props.location.state.JMBAG)
        const help = {
            JMBAG:props.location.state.JMBAG
        }
        axios.get("https://kdkman.pythonanywhere.com/student/" + JMBAG)
        .then(res =>{
            console.log("Student page")
            console.log(res.data)
            setStudent(res.data)
        })
    },[])
    const logOutHandler = ()=>{
       
        axios.put("https://kdkman.pythonanywhere.com/logOut/" + JMBAG)
        .then(res=>{
            console.log(res.data)
            props.history.push('/')
        })
      }
    return (
        <div>
            {
                student.is_logged_in?
                <div>
                    <h1 style={{borderBottom:"2px solid black"}}>Dobrodošli {student.ime}!</h1>
                    <HelpButton JMBAG={JMBAG}/>
                    <button style={LogOutButton} onClick={logOutHandler}>Log Out</button>
                </div>
                :null
            }
        </div>
    )
}

const LogOutButton = {
    marginTop:"20px",
    backgroundColor: "white",
    color: "black",
    border: "2px solid #008CBA",
    padding : "10px" 
}


export default Student
