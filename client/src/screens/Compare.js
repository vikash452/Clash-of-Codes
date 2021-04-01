import {useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import M from 'materialize-css'
import CanvasJSReact from '../assets/canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Compare()
{
    const [friendList,setFriendList]=useState([])
    const [friendhandle,setFriendHandle]=useState('DLN');
    const [userHandle,setUserhandle]=useState('Marcos_0901');
    const [content_1, setContent_1]=useState()
    const [content_2, setContent_2]=useState()
    const [options_1, setOptions_1]=useState({})

    const history=useHistory()

    useEffect(()=>{

        // var select_elems=document.querySelectorAll('select');
        // var instances = M.FormSelect.init(select_elems);
        // console.log(instances)

        // console.log(document.querySelector('canvas'))

        var user=JSON.parse(localStorage.getItem('user'))
        if(!user)
        {
            history.push('/profile')
        }

        setUserhandle(user.codeforces)
        // console.log(user.codeforces)
        fetch('/user/getFriendList',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setFriendList(data.friends)
        })
        .catch(err=>{
            console.log(err)
        })

        Compare()

    },[])

    function getRatingChange_user(list)
    {
        // console.log(userHandle)
        fetch(`https://codeforces.com/api/user.rating?handle=${userHandle}`)
        .then(res=>res.json())
        .then((data)=>{
            // data.result.reverse()
            data.result.forEach((element)=>{
                var temp_object={
                    x:new Date(element.ratingUpdateTimeSeconds*1000),
                    y:element.newRating
                }
                list.push(temp_object)
            })
            // console.log(list)
        })
    }

    function getRatingChange_friend(list)
    {
        fetch(`https://codeforces.com/api/user.rating?handle=${friendhandle}`)
        .then(res=>res.json())
        .then((data)=>{
            // data.result.reverse()
            data.result.forEach((element)=>{
                // console.log(typeof(element.newRating))
                var temp_object={
                    x:new Date(element.ratingUpdateTimeSeconds*1000),
                    y:element.newRating
                }
                list.push(temp_object)
            })
            // console.log(list)
        })
    }

    function Compare()
    {
        //USER DETAILS
        fetch(`https://codeforces.com/api/user.info?handles=${userHandle};${friendhandle}`)
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data.result[0])
            // console.log(data.result[1])
            setContent_1(data.result[0])
            setContent_2(data.result[1])
        })

        var rating_change_graph_1=[]
        var rating_change_graph_2=[]

        getRatingChange_user(rating_change_graph_1)
        getRatingChange_friend(rating_change_graph_2)
        
        console.log(rating_change_graph_1)
        console.log(rating_change_graph_2)
        var temp_options_1={
            animationEnabled: true,
            animatedRender:true,
            responsive:false,
            maintainAspectRatio:false,
                theme: "light2",
                backgroundColor:'rgba(0,0,0,0)',
                lineColor:'White',
                title:{
                    text: "Your rating change",
                    fontSize :30,
                    fontColor : "White",
                    fontFamily: "Helvetica",
                    horizontalAlign : "center",
                    padding: 5,
                },
                axisX: {
                    title: "Date",
                    // reversed: true,
                    labelAutoFit:true,
                    labelFontSize:15,
                    labelFontColor:'White',
                    titleFontColor:'White',
                    lineColor:'White',
                },
                axisY: {
                    title: "Rating",
                    labelAutoFit:true,
                    labelFontSize:15,
                    labelFontColor:'White',
                    titleFontColor:'White',
                    lineColor:'White',
                },
                height : 500,
                // width:1000,
                legend:{
                    fontColor:'White'
                },
                data: [
                    {
                    type: "spline",
                    // markerSize:0,
                    showInLegend:true,
                    legendText:`${userHandle}`,
                    dataPoints: rating_change_graph_1,
                    // lineColor:'White'
                },
                {
                    type: "spline",
                    // markerSize:0,
                    showInLegend:true,
                    legendText:`${friendhandle}`,
                    dataPoints: rating_change_graph_2,
                    // lineColor:'White'
                }
            ]
        }

        setOptions_1(temp_options_1)
        // var t=window.dispatchEvent(new Event('resize'))
        // console.log(t)
        // CanvasJSChart.render()
        // console.log('1')
        // console.log(rating_change_graph_1)
        // console.log('2')
        // console.log(rating_change_graph_2)

    }

    function ChartComponent()
    {
        return (
            <div>
                <CanvasJSChart options = {options_1}/>
            </div>
        )
    }

    return (
        <div>
            <h1>
                This is compare page
            </h1>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                Compare With
                <select style={{maxWidth:'fit-content'}} className='browser-default' onChange={(e)=>{setFriendHandle(e.target.value)}}>
                    {
                        friendList.map((item)=>{    //MATERIALIZE SELECT NOT WORKING
                            // console.log(item.codeforces)
                            return (
                                <option key={item.email} value={item.codeforces}>{item.codeforces}</option>
                            )
                        })
                        
                    }
                </select>
                OR
                <input type='text' onChange={(e)=>{setFriendHandle(e.target.value)}} style={{maxWidth:'fit-content'}} />
                <button onClick={()=>{
                    // console.log(friendhandle)
                    Compare()
                }}>Compare</button>
            </div>
            <button>Refresher</button>
            {
                options_1
                ?
                <CanvasJSChart options = {options_1}/>
                :
                <></>
            }
            
        </div>
    )
}

export default Compare;