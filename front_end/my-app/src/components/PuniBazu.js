import React,{useState} from 'react'
import axios from 'axios';

function PuniBazu() {
    
    const [ime,setIme] = useState('');
    
    const [prezime,setPrezime] = useState('');
    
    const [JMBAG,setJMBAG] = useState('');

    const submitHandler = ()=> {
        const new_studnet = {
            JMBAG : JMBAG,
            ime : ime,
            prezime : prezime
        }
        console.log("Podatci")
        console.log(new_studnet)
        console.log("odgovor")
        axios.post("http://127.0.0.1:5000/student",new_studnet)
        .then(res=>{
            console.log(res.data)
            window.location.reload();
        })
    }
    

    return (
        <div>
            <div style={border}>
                Ime: <input  type="text" placeholder="Ime" onChange={e => setIme(e.target.value)}/>
            <br/>           
            Prezime:<input  type="text" placeholder="Prezime" onChange={e => setPrezime(e.target.value)}/>
            <br/>
            JMBAG: <input  type="text" placeholder="JMBAG" onChange={e => setJMBAG(e.target.value)}/>
            <br/>
            <button onClick={submitHandler} >Dodaj novog Studenta</button>
            </div>
          
        </div>
    )
}
const border = {
    color: "white",
    border:"1px solid black",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
export default PuniBazu
