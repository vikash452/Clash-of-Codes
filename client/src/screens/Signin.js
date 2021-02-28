import {useState,useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function Signin()
{
    var [email,setEmail]=useState('')
    var [password,setPassword]=useState('')
    const history=useHistory();
    var user=JSON.parse(localStorage.getItem('user'))
    useEffect(()=>{
        if(user)
        {
            history.push('/home')
        }
    },[]);

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
            <input type='text' placeholder='password' style={{maxWidth:'300px', color:'white !important'}}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
            <br />
            <br />
            <button className='btn-large' onClick={()=>{Login()}}>Sign In</button>
            <br/>
            <br/>
            <span><Link to='/forgotPassword'><h4>Forgot your password?</h4></Link> </span>
            <br/>
            <h4><span>Don't have an account? <Link to='/signup'>SignUp</Link> </span></h4>
            

        </div>
    )
}

export default Signin;