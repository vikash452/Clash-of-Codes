import {useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Profile()
{
    const history=useHistory();
    var user;
    const [cf,setCf]=useState('');
    useEffect(()=>{
        user=JSON.parse(localStorage.getItem('user'))
        if(user)
        {
            setCf(user.codeforces)
        }
        else
        {
            history.push('/signin')
        }
    },[])
    

    function addCfHandle(platform)
    {
        fetch('/post/handles',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                platform,
                handle:cf
            })
            })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data)
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
                    html:'handle set successfully',
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                    })
                    setCf(data.codeforces)
                    localStorage.setItem('user',JSON.stringify(data))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='codeforces handle' style={{maxWidth:'300px'}}
                onChange={(e)=>{
                    setCf(e.target.value)
                }}
                />
                <br/>
                <button onClick={()=>{addCfHandle('codeforces')}}>Set codeforces handle</button>
            </div>
            <div>
                <h1>Your current Codeforces handle is {cf}</h1>
            </div>
            
        </div>
    )
}

export default Profile;