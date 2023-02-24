import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import   './Join.css'

let user;
const Join = () => {
    const sendUsers = () =>{
    
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = "";
    }

    const[name,setName] = useState("");
    console.log(name);

  return (
    <div className='joinPage'>
       <div className='joinContainer'>
        <img src="https://seeklogo.com/images/W/whatsapp-logo-DDC3F9A34F-seeklogo.com.png" alt="logo"></img>
        <h1>ichat App</h1>
        <input type="text" onChange={(e)=> setName(e.target.value)} id="joinInput" placeholder='Type here Chat'></input>
        <Link onClick={(e) => !name ? e.preventDefault():null} to="/chat"><button  onClick={sendUsers}  type='submit' id="joinBtn">Login In</button></Link>
        
       </div>
      
    </div>
  )
}

export default Join
export {user};