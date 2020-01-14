import React, { useEffect,useState } from 'react'

function Login(props) {

    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    
    const logInHandler =()=>{
        if(username === "admin" && password == "123"){
            console.log("Admin Loging Success")
            props.history.push('/home')
        }
    }

    return (
        <div>
            <div style={container}>
                <h1>Please Login</h1>
                <div style={container}>
                    <label>Please enter your username</label>
                    <br/>
                    <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
                    <br/>
                    <label>Please enter your password</label>
                    <br/>
                    <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
                    <br/>
                    <br/>
                    <button onClick={logInHandler}>Login</button>
                </div>
            </div>
        </div>
    )
}


const container = {
    maring:"0 auto ",
    padding: "10",
    border:"1px solid black",
    width:"960px",

}

export default Login
