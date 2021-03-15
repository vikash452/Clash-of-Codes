import fetch from 'node-fetch';
import {useEffect,useState} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'
import CanvasJSReact from '../assets/canvasjs.react'
import './design.css';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Codechef()
{

    const [fullName,setFullName]=useState('')
    const [star,setStar]=useState('')
    const [college,setCollege]=useState('')
    const [handle,setHandle]=useState('')
    const [content,setContent]=useState()
    var user;
    const history=useHistory()

    useEffect(()=>{
        user=JSON.parse(localStorage.getItem('user'))
        if(!user)
        {
            history.push('/signin')
        }

        if(user.codechefVerified == false)
        {
            window.location.href='https://api.codechef.com/oauth/authorize?response_type=code&client_id=914de23a3999f5e2e312d3c06fd003b7&redirect_uri=http://www.clashofcodes.herokuapp.com/codechefdone&state=xyz'
        }

        setHandle(user.codechef)
        
        if(handle)
        trigger_after_page_loading()
    },[handle]);

    function trigger_after_page_loading()
    {
        if(handle.length == 0)
        {
            alert("Please set your codeforces handle");
            history.push('/profile');
        }

        fetch(`/codechef/api/users/${handle}`,{
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            setContent(data.result.data.content)
            // console.log(Object.entries(data.result.data.content.problemStats.attempted))
            // for(let [key,value] of Object.entries(data.result.data.content.problemStats.attempted))
            // {
            //     console.log(key,value)
            // }
            // Object.entries(data.result.data.content.problemStats.attempted).forEach((item)=>{
            //     console.log(item)
            //     item[1].forEach(i=>{
            //         console.log(i)
            //     })
            // })
            // console.log(Object.entries(data.result.data.content.rankings))
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    if(content)
    {
        return (
            <div>
                <h1>{content.fullname}</h1>
                <h1>{content.occupation}</h1>
                <h1>{content.organization}</h1>
                <h1>{content.band} star</h1>
                <h1>allContestRanking country {content.rankings.allContestRanking.country} global {content.rankings.allContestRanking.global}</h1>
                
                {
                    Object.entries(content.submissionStats).map((submission)=>{
                        return(
                            <h3 key={submission[0]}>{submission[0]} : {submission[1]}</h3>
                        )
                    })
                }
                <br/>
                <br/>

                {
                    Object.entries(content.rankings).map((item)=>{
                        // console.log(item)
                        return (
                            <h3 key={item[0]}>{item[0]}   country : {item[1].country} , global : {item[1].global}</h3>
                        )
                        
                    })
                }

                <br/>
                <br/>

                {
                    Object.entries(content.problemStats.attempted).map((submission)=>{
                        return(
                            <div key={submission[0]}>
                                <h2>{submission[0]}</h2>
                                {
                                    submission[1].map((problemName)=>{
                                        return (
                                            <h4 key={problemName}>{problemName} </h4>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    else
    {
        return (
            <div><h1>Loading</h1></div>
        )
    }

    
}

{/* <a href={'https://api.codechef.com/oauth/authorize?response_type=code&client_id=914de23a3999f5e2e312d3c06fd003b7&redirect_uri=http://localhost:3000/codechefdone&state=xyz'}>A</a> */}

export default Codechef;