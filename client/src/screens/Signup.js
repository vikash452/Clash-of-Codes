import {useState,useEffect} from 'react'
import {useHistory,Link} from 'react-router-dom'
import M from 'materialize-css'

function Signup()
{
    var [email,setEmail]=useState('')
    var [password,setPassword]=useState('')
    var [name,setName]=useState('')
    var [vCode,setVcode]=useState('')
    var [gotCode,setGotCode]=useState(false)
    const history=useHistory();

    function getVerificationCode()
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
            // console.log(data)
            // if(data.error)
            // {
            //     alert(data.error)
            // }
            // else{
            //     alert(data.message)
            // }

            if(data.error)
            {
                M.toast({
                html:data.error,
                classes: '#ce93d8 purple',
                displayLength: 2000,
                })
            }
            else
            {
                M.toast({
                html:data.message,
                classes: "#ce93d8 purple",
                displayLength: 1000,
                })

                setGotCode(true)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function verifyCode()
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
            // console.log(data)
            // alert(data)
            // if(data.error)
            // {
            //     alert(data.error)
            // }
            // else
            // {
            //     alert('you are successfully registered')
            // }

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
                html:'you are successfully registered',
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

    return(
        <div>
            <input type='text' placeholder='name' style={{maxWidth:'300px'}}
            onChange={(e)=>{
                setName(e.target.value)
            }}
            />

            <br/>

            <input type='text' placeholder='email' style={{maxWidth:'300px'}}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />

            <br/>

            <input type='text' placeholder='password'  style={{maxWidth:'300px'}}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
            <br/>
            <button className='btn-large' onClick={()=>{getVerificationCode()}}>SignUp</button>
            <br/><br/>

            {
                gotCode
                ?
                <div>
                    <input type='text' placeholder='verification code' style={{maxWidth:'300px'}}
                    onChange={(e)=>{
                        setVcode(e.target.value)
                    }}
                    />
                    <br/>
                    <button className='btn-large' onClick={()=>{verifyCode()}}>Verify</button>
                </div>
                :
                <div>
                    <span>Already have an account? <Link to='/signin'>SignIn</Link> </span>
                </div>
            }

        </div>
    )
}

export default Signup;