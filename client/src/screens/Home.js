import { Verify } from 'crypto'
import {useEffect,useState} from 'react'
import {useHistory,Link} from 'react-router-dom'
import $ from 'jquery';
import M from 'materialize-css'

function Home()
{
    function Logout()
    {
        fetch('/user/logout',{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            localStorage.clear()
            history.push('/signin')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    var [name,setName]=useState('');
    var user;
    const history=useHistory();
    useEffect(()=>{

        user=JSON.parse(localStorage.getItem('user'))
        // console.log(user)
        if(!user)
        {
            history.push('/signin')
        }
        else
        {
            setName(user.name)
        }
    },[])
    
    return(
        <div>
            <h1>Hi {name}</h1>
            <h2>....Hope you are coding well....</h2>
            <button className='btn-large' onClick={()=>{Logout()}}>Logout</button>
        </div>
    )
}

export default Home;