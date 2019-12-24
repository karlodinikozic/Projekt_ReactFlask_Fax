import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Student(props) {
    console.log("ALIVE")
    const {JMBAG} = props
    const [student,setStudent]=useState({});

    useEffect(()=>{
        const help = {
            JMBAG:JMBAG
        }
        axios.get("http://127.0.0.1:5000/student",help)
        .then(res =>{
            console.log("Student page")
            console.log(res.data)
            setStudent(res.data)
        })
    },[])

    return (
        <div>
            {
                student.is_logged_in?
                <div>
                    <p>{student.ime}</p>
                </div>
                :null
            }
        </div>
    )
}

export default Student
