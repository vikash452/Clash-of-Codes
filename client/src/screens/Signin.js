import {useState,useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import M from 'materialize-css'

function Signin()
{
    var [email,setEmail]=useState('')
    var [password,setPassword]=useState('')
    const history=useHistory();

    function Login()
    {
        fetch('/user/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.error)
            {
                M.toast({
                    html:'Invalid email id or password',
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                })
            }
            else{
                M.toast({
                    html:'Successfully signed in',
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                })
                localStorage.setItem('jwt',data.token)
                localStorage.setItem('user',JSON.stringify(data.foundUser))
                history.push('/home')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div>
            <input type='text' placeholder='email' style={{maxWidth:'300px'}}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />
            <br />
            <input type='text' placeholder='password' style={{maxWidth:'300px'}}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
            <br />
            <br />
            <button onClick={()=>{Login()}}>Sign In</button>
            <br/>
            <br/>
            <span>Don't have an account? <Link to='/signup'>SignUp</Link> </span>

        </div>
    )
}

export default Signin;