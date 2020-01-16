import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PopUp from './PopUp'

function StudentsNeedHelp() {
    const [studentsNeedHelp, setStudentsNeedHelp] = useState([])
    const [callEvery10,setCallEvery10] = useState({})

    useEffect(()=>{
        
        checkNewStudents()
        //setInterval(() => setCallEvery10({ time: Date.now()}), 10000)
    },[callEvery10])

    const checkNewStudents = ()=>{
        axios.get("https://kdkman.pythonanywhere.com/studentsNeedHelp")
        .then(res=>{
            console.log(res.data)
            setStudentsNeedHelp(res.data)}
        )
    }


    return (
        <div>
            <div>
                <button onClick={checkNewStudents}>Check if students need help</button>
            </div>
            {
                studentsNeedHelp.length>0?
                <div style={Alert}>
                    {studentsNeedHelp.length} treba pomoć
                  <PopUp students = {studentsNeedHelp}/>
                </div>:
                <h2>Nema studenta kojima treba pomoć</h2>
                
            }
        </div>
    )
}

const Alert = {
    border : "5px solid red",
    margin : "10px auto",
    padding: "10 px",
    width: "50%",
    color:"white",
    backgroundColor:'red'
}
export default StudentsNeedHelp
