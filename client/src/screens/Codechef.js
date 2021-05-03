import fetch from 'node-fetch';
import {useEffect,useState} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'
import CanvasJSReact from '../assets/canvasjs.react'
import './design.css';
// import AOS from 'aos'
// import 'aos/dist/aos.css'

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
        // AOS.init({
        //     duration:2000,
        // })
        // AOS.init({
        //     duration:1000
        // })
        user=JSON.parse(localStorage.getItem('user'))
        if(!user)
        {
            history.push('/signin')
        }

        
        // console.log(`https://api.codechef.com/oauth/authorize?response_type=code&client_id=c6fea028e960e1096ba59b88e3532118&redirect_uri=${REDIRECT_URI_PRACTICE}&state=xyz`)
        setHandle(user.codechef)
        
        if(user.codechef)
        {
            if(user.codechefVerified == false)
            {
                window.location.href=`https://api.codechef.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID_CODECHEF}&redirect_uri=${REDIRECT_URI}&state=xyz`
            }
            trigger_after_page_loading()
        }
        else{
            history.push('/profile')
        }
    },[handle]);

    function trigger_after_page_loading()
    {
        // if(handle.length == 0)
        // {
        //     alert("Please set your codeforces handle");
        //     history.push('/profile');
        // }

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
            <div className='row codechefParent' style={{marginTop:'100px'}}>
                <div className='codechefCard initialDetailsCard col s12 m12 l12 xl12 '>
                    <span>{content.fullname}</span>
                    <br/>
                    <span>{content.occupation}</span>
                    <br/>
                    <span>{content.organization}</span>
                    <br/>
                    <span>{content.band} star</span>
                </div>

                <div className='codechefCard contestRankingsCard col s12 m12 l12 xl12    '>
                            {
                                Object.entries(content.rankings).map((item)=>{
                                    // console.log(item)
                                    return (
                                        <div key={item[0]}>
                                            <span>{item[0]}   country : {item[1].country} , global : {item[1].global}</span>
                                            <br/>
                                        </div>
                                        
                                    )
                                    
                                })
                            }
                </div>
                
                <div className='codechefCard submissionDetailsCard col s12 m12 l12 xl12  '>
                        {
                            Object.entries(content.submissionStats).map((submission)=>{
                                return(
                                    <div key={submission[0]}>
                                        <span>{submission[0]} : {submission[1]}</span>
                                        <br/>
                                    </div>
                                    
                                )
                            })
                        }
                </div>

                <div className='codechefCard attemptedProblemsCard col s12 m12 l12 xl12  '>
                <h4>Your solved problems</h4>
                {
                    Object.entries(content.problemStats.solved).map((submission)=>{
                        return(
                            <div key={submission[0]}>
                                <span style={{fontSize:'35px'}}>{submission[0]} : </span>
                                {
                                    submission[1].map((problemName)=>{
                                        return (
                                            <a 
                                                key={problemName} 
                                                href={`https://www.codechef.com/problems/${problemName}`} 
                                                target='_blank'
                                                style={{color:'#e6ff02'}}
                                            >
                                                <span  style={{fontSize:'20px'}}>{problemName} </span>
                                            </a>
                                                
                                        )
                                    })
                                }
                                <br/>
                            </div>
                        )
                    })
                }
            </div>
                
                <div className='codechefCard partiallySolvedProblemsCard col s12 m12 l12 xl12'>
                    <h4>Your Unsolved Problems</h4>
                    {
                        Object.entries(content.problemStats.partiallySolved).map((partSol)=>{
                            return(
                                <div key={partSol[0]}>
                                    <span style={{fontSize:'35px'}}>{partSol[0]} : </span>
                                    {
                                        partSol[1].map((problemName)=>{
                                            return (
                                                // <div key={problemName}>
                                                <a 
                                                key={problemName} 
                                                href={`https://www.codechef.com/problems/${problemName}`} 
                                                target='_blank'
                                                style={{color:'#e6ff02'}}
                                                >
                                                    <span  style={{fontSize:'20px'}}>{problemName} </span>
                                                </a>
                                                    
                                                    // <br/>
                                                // </div>
                                                
                                            )
                                        })
                                    }
                                    <br/>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
    else
    {
        return (
            <div style={{marginTop:'100px'}}>
                <div className="preloader-wrapper big active" style={{marginBottom:''}}>
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
                <h3>...We are cooking something for you...</h3>
                <h4>...Till then you can sanitize your hands...</h4>
                <h4>...Let's give &#128520; a compilation error...</h4>
            </div>
        )
    }

    
}

{/* <a href={'https://api.codechef.com/oauth/authorize?response_type=code&client_id=914de23a3999f5e2e312d3c06fd003b7&redirect_uri=http://localhost:3000/codechefdone&state=xyz'}>A</a> */}

export default Codechef;