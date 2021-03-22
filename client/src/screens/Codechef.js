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
            <div className='row codechefParent'>
                <div className='codechefCard initialDetailsCard col s6 '>
                    <span>{content.fullname}</span>
                    <br/>
                    <span>{content.occupation}</span>
                    <br/>
                    <span>{content.organization}</span>
                    <br/>
                    <span>{content.band} star</span>
                </div>

                <div className='codechefCard contestRankingsCard col s6 '>
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
                
                <div className='codechefCard submissionDetailsCard col s6 '>
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

                <div className='codechefCard attemptedProblemsCard col s6 '>
                {
                    Object.entries(content.problemStats.attempted).map((submission)=>{
                        return(
                            <div key={submission[0]}>
                                <span>{submission[0]}</span>
                                {
                                    submission[1].map((problemName)=>{
                                        return (
                                            <div key={problemName}>
                                                <span >{problemName} </span>
                                                <br/>
                                            </div>
                                            
                                        )
                                    })
                                }
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