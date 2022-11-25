import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { userRequest } from "../../publicrequest";

function Demo() {
    const[img,setImage]=useState({});
    const { currentUser } = useSelector((state) => state.user);
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
 
    const TOKEN = currentUser?.accessToken;
    const handlechange=(event)=>{
       setImage(event.target.files[0]);

    }
    const sendImage=async(e)=>{
        e.preventDefault();
        let formdata=new FormData();
        formdata.append("img",img);
        console.log(img);
        console.log(TOKEN);
        const res1= await  userRequest.post("/products/registerproduct1", formdata,{headers: { token: `Bearer ${TOKEN}`,'content-type':'multipart/form-data' }});
    }
    
  return (
    <div>
        <form onSubmit={(e)=>sendImage(e)}>
            <input type="file" name='img' onChange={handlechange} />
            <button type='submit'>upload</button>
        </form>
    </div>
  )
}

export default Demo