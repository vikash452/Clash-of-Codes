import { Verify } from 'crypto'
import {useEffect,useState} from 'react'

function Home()
{
    var [email,setEmail]=useState('')
    var [password,setPassword]=useState('')
    var [name,setName]=useState('')
    var [vCode,setVcode]=useState('')
    var [gotCode,setGotCode]=useState(false)

    useEffect(()=>{
        console.log('triggered')
        fetch('/question/test',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
        })
    },[])    

    function sendVerificationCode()
    {
        fetch('/user/verifyCode',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password,
                code:vCode,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
        })
    }

    function Signup()
    {
        fetch('/user/signup',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
        })
    }

    function Signin()
    {
        fetch('/user/signin',{
            method: 'POST',
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
            console.log(data)
            localStorage.setItem('jwt',data.token)
            localStorage.setItem('user',JSON.stringify(data.foundUser))
        })
    }

    return(
        <div>
            <h1>Hello</h1>

            <input type='text' placeholder='name'
            
            onChange={(e)=>{
                // console.log(e.target.value)
                setName(e.target.value)
            }}

            />

            <input type='text' placeholder='email'
            
            onChange={(e)=>{
                // console.log(e.target.value)
                setEmail(e.target.value)
            }}

            />
            <input type='text' placeholder='password'
            
            onChange={(e)=>{
                // console.log(e.target.value)
                setPassword(e.target.value)
            }}

            />

            <input type='text' placeholder='verification code'
            
            onChange={(e)=>{
                // console.log(e.target.value)
                setVcode(e.target.value)
            }}

            />



            <button onClick={()=>{
                Signup()
            }}>Signup</button>

            <button onClick={()=>{
                sendVerificationCode()
            }}>Verify</button>

            <button onClick={()=>{
                Signin()
            }}>Signin</button>

        </div>
    )
}

export default Home;