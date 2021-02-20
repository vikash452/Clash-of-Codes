import { Verify } from 'crypto'
import {useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'

function Home()
{
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
            <h2>....You can see this page because you are logged in xD....</h2>
        </div>
    )
}

export default Home;