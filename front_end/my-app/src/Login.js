import React,{useState} from 'react'

function Login() {
    const [JMBAG, setJMBAG] = useState(0);
    const handleClick = () => {
        JMBAG 
        
    }
    return (
        <div style={{backgroundColor: "pink",height: "100px"}}>
            <h3>Unesi JMBAG</h3>
            <input type="text" name="jmbag" value={JMBAG}></input>
            <button onClick={handleClick}>Login</button>
       </div>
    )
}

export default Login
