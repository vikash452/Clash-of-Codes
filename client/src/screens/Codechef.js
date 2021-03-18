import fetch from 'node-fetch';
import {useEffect,useState} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'
import CanvasJSReact from '../assets/canvasjs.react'
import Pre from '../images/pre.gif'
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
    const REDIRECT_URI_PRACTICE='http://localhost:3000/codechefdone'
    const REDIRECT_URI='https://clashofcodes.herokuapp.com/codechefdone'
    
    const CLIENT_ID_CODECHEF_PRACTICE='0b05f9d425528e5d97f7b8905ad4111b'
    const CLIENT_ID_CODECHEF='c6fea028e960e1096ba59b88e3532118'

    useEffect(()=>{
        user=JSON.parse(localStorage.getItem('user'))
        if(!user)
        {
            history.push('/signin')
        }

        if(user.codechefVerified == false)
        {
            window.location.href=`https://api.codechef.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID_CODECHEF_PRACTICE}&redirect_uri=${REDIRECT_URI_PRACTICE}&state=xyz`
        }
        // console.log(`https://api.codechef.com/oauth/authorize?response_type=code&client_id=c6fea028e960e1096ba59b88e3532118&redirect_uri=${REDIRECT_URI_PRACTICE}&state=xyz`)
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
            console.log(data)
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
            {/* <div style={{backgroundImage:`linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.9)),url(${Pre})`, height:'700px' , width:'800px', margin:'auto'}}></div> */}

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
            <div>
            {/* <div style={{backgroundImage:`url(${Pre})`, height:'700px' , width:'800px', margin:'auto'}}></div> */}
                <div className="preloader-wrapper big active" style={{marginBottom:'400px'}}>
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
}

{/* <a href={'https://api.codechef.com/oauth/authorize?response_type=code&client_id=914de23a3999f5e2e312d3c06fd003b7&redirect_uri=http://localhost:3000/codechefdone&state=xyz'}>A</a> */}

export default Codechef;