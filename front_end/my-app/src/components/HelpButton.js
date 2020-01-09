import React from 'react'
import axios from 'axios';

function HelpButton(props) {

    const help=()=>{
        var msg=prompt("Unesite pitanje");
        msg = {msg:msg}
        console.log(msg);
        //kreiraj rutu na koju šalješ json
        axios.put("http://127.0.0.1:5000/askhelp/" + props.JMBAG, msg)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <button style={helpButton}onClick={help}>Help!</button>
        </div>
    )
}

const helpButton = {
    color:"white",
    backgroundColor: "#f44336" ,
     padding: "14px 40px",
     borderRadius: "8px",
     border:"none"

}

export default HelpButton
