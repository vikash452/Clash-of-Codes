import { Verify } from 'crypto'
import {useEffect,useState} from 'react'
import {useHistory,Link} from 'react-router-dom'

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
            <h2>Update your handles on your <Link to='/profile'>Profile</Link></h2>
            <h2>Check the <Link to='/contest'>Contests Page</Link></h2>
        </div>
    )
}

export default Home;