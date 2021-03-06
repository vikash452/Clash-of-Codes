import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BlobbyButton from "../assets/BlobbyButton";
import './design.css'
import CanvasJSReact from '../assets/canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CompareCodechef()
{
    const [userHandle,setUserhandle]=useState('')
    const [friendhandle,setFriendhandle]=useState('')
    const [friendList, setFriendList]=useState([])
    const [content_1,setContent_1]=useState(null)
    const [content_2,setContent_2]=useState(null)
    const [submission_stats_array_user, setSubmission_stats_array_user]=useState([])
    const [submission_stats_array_friend, setSubmission_stats_array_friend]=useState([])
    const history=useHistory()
    var user;
    useEffect(()=>{
        user=JSON.parse(localStorage.getItem('user'))
        if(!user.codechefVerified)
        {
            history.push('/profile')
        }

        setUserhandle(user.codechef)

        fetch('/user/getFriendList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            setFriendList(data.friends)
        })
        .catch(err => {
            console.log(err)
        })

    },[])

    // function 

    function FillFriendDetails()
    {
        fetch(`/codechef/api/users/${friendhandle}`,{
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setContent_2(data.result.data.content)

            var list=[]
            for(let [key,value] of Object.entries(data.result.data.content.submissionStats))
            {
                var temp_object={
                    label:key,
                    y:value
                }
                list.push(temp_object)
            }
            setSubmission_stats_array_friend(list)
            console.log(list)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function FillUserDetails()
    {
        fetch(`/codechef/api/users/${userHandle}`,{
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setContent_1(data.result.data.content)

            var list=[]
            for(let [key,value] of Object.entries(data.result.data.content.submissionStats))
            {
                var temp_object={
                    label:key,
                    y:value
                }
                list.push(temp_object)
            }
            setSubmission_stats_array_user(list)
            console.log(list)
            FillFriendDetails()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function Compare()
    {
        FillUserDetails()
    }

    return (
        <div className='compare-div' style={{marginBottom:(content_1 && content_2) ? '50px': '180px'}}>
            <div className="content">
                {/* style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}> */}
                <span><h4>Compare Yourself With</h4></span>
                <select
                    // style={{ maxWidth: 'fit-content' }}
                    className='browser-default' onChange={(e) => { setFriendhandle(e.target.value) }}
                    onClick={(e)=>{setFriendhandle(e.target.value)}}
                    >

                    {
                        friendList.map((item) => {    //MATERIALIZE SELECT NOT WORKING
                            // console.log(item.codeforces)
                            return (
                                <option key={item.email} value={item.codechef}>{item.codechef}</option>
                            )
                        })

                    }
                </select>
                <h5>OR</h5>
                <input type='text' onChange={(e) => { setFriendhandle(e.target.value) }} 
                // style={{ maxWidth: 'fit-content' }}
                 />
                <button className="blobby-button" onClick={() => {
                    console.log(friendhandle)
                    Compare()
                }}>Compare
                    <BlobbyButton/>
                </button>
            </div>
        
            <div className='compareTable'>
                {
                    (content_1 && content_2)
                    ?
                    <table>
                        <thead>
                            <tr>
                                <td style={{textAlign:'center'}}>{userHandle} ({content_1.fullname})</td>
                                <td style={{textAlign:'center'}}>{friendhandle} ({content_2.fullname})</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {content_1.band} , Rating : {content_1.ratings.allContest}
                                </td>
                                <td>
                                    {content_2.band} , Rating : {content_2.ratings.allContest}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {content_1.city.name}, {content_1.country.name}
                                </td>
                                <td>
                                    {content_2.city.name}, {content_2.country.name}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {content_1.occupation}, {content_1.organization}
                                </td>
                                <td>
                                    {content_2.occupation}, {content_2.organization}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {content_1.submissionStats.solvedProblems} solved problems
                                </td>
                                <td>
                                    {content_2.submissionStats.solvedProblems} solved problems
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Global Ranking : {content_1.rankings.allContestRanking.global} 
                                    <br/>
                                    Country Ranking : {content_1.rankings.allContestRanking.country} 
                                </td>
                                <td>
                                    Global Ranking : {content_2.rankings.allContestRanking.global} 
                                    <br/>
                                    Country Ranking : {content_2.rankings.allContestRanking.country} 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    :
                    <></>
                }
            </div>   

            
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                {
                    (content_1 && content_2)
                        ?
                        <CanvasJSChart options={

                            {
                                animationEnabled: true,
                                theme: "light2",
                                zoomEnabled: true,
                                backgroundColor: 'rgba(0,0,0,0)',
                                lineColor: 'White',
                                title: {
                                    text: "Submission Statistics",
                                    fontSize: 30,
                                    fontColor: "White",
                                    fontFamily: "Helvetica",
                                    horizontalAlign: "center",
                                    padding: 5,
                                },
                                axisX: {
                                    title: "Verdict",
                                    // reversed: true,
                                    labelAutoFit: true,
                                    labelFontSize: 15,
                                    labelFontColor: 'White',
                                    titleFontColor: 'White',
                                    lineColor: 'White',
                                },
                                axisY: {
                                    title: "Number",
                                    labelAutoFit: true,
                                    labelFontSize: 15,
                                    labelFontColor: 'White',
                                    titleFontColor: 'White',
                                    lineColor: 'White',
                                },
                                height: 500,
                                // width:1000,
                                legend: {
                                    fontColor: 'White'
                                },
                                data: [
                                    {
                                        type: "bar",
                                        // markerSize:0,
                                        showInLegend: true,
                                        legendText: `${userHandle}`,
                                        dataPoints: submission_stats_array_user,
                                        // lineColor:'White'
                                    },
                                    {
                                        type: "bar",
                                        // markerSize:0,
                                        showInLegend: true,
                                        legendText: `${friendhandle}`,
                                        dataPoints: submission_stats_array_friend,
                                        // lineColor:'White'
                                    }
                                ]
                            }
                        }
                        />
                        :
                        <></>
                }
            </div>
            

        </div>
    )
}

export default CompareCodechef;