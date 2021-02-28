import {useState,useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function ForgotPassword()
{
    const [email,setEmail]=useState('');

    function ChangePassword()
    {
        fetch('/user/forgotPassword',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                email,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.error)
            {
                M.toast({
                    html:data.error,
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                })
            }
            else
            {
                M.toast({
                    html:data.message,
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <input type='text' placeholder='email' style={{maxWidth:'300px', margin:'20px'}}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />
            <button className='btn btn-large' onClick={()=>ChangePassword()}>Change Password</button>
        </div>
    )
}

export default ForgotPassword;