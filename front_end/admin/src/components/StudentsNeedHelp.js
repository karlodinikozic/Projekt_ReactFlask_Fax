import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PopUp from './PopUp'
import { Container, Button } from 'react-bootstrap'

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
        <Container>
            <div>
                <Button onClick={checkNewStudents}>Check if students need help</Button>
            </div>
            {
                studentsNeedHelp.length>0?
                <div style={Alert}>
                    {studentsNeedHelp.length} treba pomoć
                  <PopUp students = {studentsNeedHelp}/>
                </div>:
                <h2>Nema studenta kojima treba pomoć</h2>
                
            }
        </Container>
    )
}

const Alert = {   
    color:"Red",
}
export default StudentsNeedHelp
