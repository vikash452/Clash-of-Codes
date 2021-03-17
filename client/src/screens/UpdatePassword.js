import {useState,useEffect} from 'react'
import {useHistory, Link,useParams} from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function UpdatePassword()
{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {vCode}=useParams()
    const history=useHistory()

    function ChangePassword()
    {
        fetch('/user/updatePassword',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                email,
                verification:vCode,
                password
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
                localStorage.setItem('user',JSON.stringify(data))
                M.toast({
                    html:'Password updated successfully',
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                })
                history.push('/signin')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            
            <input type='text' placeholder='email' style={{maxWidth:'300px'}}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />
            <input type='text' placeholder='password' style={{maxWidth:'300px'}}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
            <button className='btn btn-large' onClick={()=>ChangePassword()}>Change Password</button>
        </div>
    )
}

export default UpdatePassword;