import React,{useState,useEffect} from 'react'
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
           Ime: <input  type="text" placeholder="Ime" onChange={e => setIme(e.target.value)}/>
           <br/>           
           Prezime:<input  type="text" placeholder="Prezime" onChange={e => setPrezime(e.target.value)}/>
           <br/>
           JMBAG: <input  type="text" placeholder="JMBAG" onChange={e => setJMBAG(e.target.value)}/>

           <button onClick={submitHandler} >DOdaj</button>
        </div>
    )
}

export default PuniBazu
