import fetch from 'node-fetch'
import {useEffect, useState} from 'react'
import {useHistory,useParams} from 'react-router-dom'

function ChefAuthorization()
{
    const history=useHistory()
    var params=new URLSearchParams(history.location.search)
    var code=params.get('code')


    useEffect(()=>{
        // console.log(code)
        fetch('/codechef/accessToken',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt') 
            },
            body:JSON.stringify({
                code,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            localStorage.setItem('user',JSON.stringify(data))
            var clock=setTimeout(()=>{
                history.push('/codechef')
            },2000)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <div style={{marginTop:'135px'}}>
            <h1>Successfully authorized</h1>
            <h1>Redirecting to the codechef page</h1>
        </div>
    )
}

export default ChefAuthorization;