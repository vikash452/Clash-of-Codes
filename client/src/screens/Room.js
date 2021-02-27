import {useEffect,useState} from 'react'
import {Link, useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
function compare(a, b){
    return a.result.problem.rating - b.result.problem.rating;
}
function Room()
{
    const history=useHistory();
    const {roomId}=useParams();
    // console.log(roomId)
    // const [roomDetails,setRoomDetails]=useState()
    const [roomName,setRoomName]=useState('');
    const [participants,setParticipants]=useState([])
    // let questionList=[]
    const [questionList,setQuestionList]=useState([])
    const [q2,setQ2]=useState([])
    // const [startTime,setStartTime]=useState(Date)
    var startTime;
    const [hours,setHours]=useState(0);
    const [minutes,setMinutes]=useState(0);
    const [seconds,setSeconds]=useState(0);
    var isAdmin=false;
    var user;

    useEffect(()=>{
        user=JSON.parse(localStorage.getItem('user'))
        fetch(`/contest/roomDetails/${roomId}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            if(data.error)
            {
                alert('no such room exists')
                history.push('/home')
            }
            else
            {
                // setRoomDetails(data)
                setRoomName(data.name)
                setParticipants(data.participants)
                // console.log(user.email)
                // console.log(data.adminEmail)
                if(user.email == data.adminEmail)
                {
                    isAdmin=true
                }
                // console.log(isAdmin)
                // setStartTime(new Date(data.startTiming).getTime())
                startTime=new Date(data.startTiming).getTime()

                var clock=setInterval(()=>{
                var now=new Date().getTime();
                var diff=Math.floor((startTime-now)/1000);
                var s=diff%60;
                var min=Math.floor(diff/60) %60;
                var hrs=Math.floor(diff/(60*60)) % 60;
                setSeconds(s)
                setMinutes(min)
                setHours(hrs)

                if(hrs<=0 && min<=0 && s<=0)
                {
                    // console.log('t')
                    // console.log(clock)
                    StartContest()
                    clearInterval(clock)
                }

                },1000)
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })

        
        

    },[])

    function GetProblems()
    {
        // let handles = ['umanggupta001122', 'Marcos_0901', 'Lord_Invincible', 'shantys502'];
        let handles=[]
        participants.forEach(part=>{
            handles.push(part.codeforces)
        })
        let arr = [];
        let i = 0;
        let nmap = new Map();
        // console.log(participants)
        handles.forEach(function(handle){
            if(handle.length == 0)
            {
                alert("Please set your codeforces handle");
                history.push('/profile');
            }
            fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
            .then(response => response.json())
            .then(data =>{
                //console.log(data);
                data.result.forEach(function(element){
                    //console.log(element.problem.contestId, element.problem.index);
                    let id = element.problem.contestId.toString() + element.problem.index;
                    if( element.verdict === "OK")
                        nmap.set( id, true);
                })
            })
        });
        // console.log(nmap);
        let k = 800;
        fetch(`https://codeforces.com/api/problemset.problems`)
        .then(response => response.json())
        .then( data =>{
            //console.log(data);
            data.result.problems.forEach(function(element){
                let id = element.contestId.toString() + element.index;
                if( k < 1600 && nmap.get(id) !== true && element.rating === k ){
                    arr[i] = element;
                    i += 1;
                    k += 100;
                }
            });
            // console.log(questionList);
            // setQ2(questionList)
            setQuestionList(arr)
        })
    }

    function Refresh()
    {
        fetch(`/contest/roomDetails/${roomId}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            if(data.error)
            {
                alert('no such room exists')
                history.push('/home')
            }
            else
            {
                // setRoomDetails(data)
                setRoomName(data.name)
                setParticipants(data.participants)
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function LeaveRoom()
    {
        fetch(`/contest/leaveRoom/${roomId}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
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
                history.push('/home')
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    function StartContest()
    {
        Refresh()
        GetProblems()
    }

    useEffect(()=>{
        // console.log(questionList)
    },[questionList])

    return (
        <div>
            <h2>Room name: {roomName}</h2>
            <h2>Room Id: {roomId}</h2>
            <h2>Before start : {hours}h {minutes}min {seconds}sec</h2>
            <h2>Total participants: {participants.length}</h2>
            <input type='time' style={{maxWidth:'500px'}}
            onChange={(e)=>{
                console.log(e.target.value)
            }}
            />
            <br/>
            <button className='btn-large' onClick={()=>{Refresh()}} style={{margin:'20px'}}>Refresh</button>
            <button className='btn-large' onClick={()=>LeaveRoom()} style={{margin:'20px'}}>Leave Room</button>
            {/* <input type></input> */}
            <button className='btn-large' onClick={()=>StartContest()} style={{margin:'20px'}}>Start Contest</button>
            <div>
               { 
                participants.map((part)=>{
                    // console.log(part)
                    return (
                            <div key={part._id}>
                                <h3>{part.name}</h3>
                            </div>
                        )
                    })
                }
            </div>
           
           <div className='row'>
               {
                   questionList.map(question=>{
                       return (
                           <a className='col s3' href={`https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`} 
                           target='_blank' 
                           key={question.name}
                           style={{color:'black'}}
                           >
                                <div className='card' style={{height:'500px'}}>
                                    <div className='card-content'>
                                        <span className='card-title'><h2>{question.name}</h2></span>
                                        <h3>{question.contestId}{question.index}</h3>
                                        {
                                            question.tags.map((tag)=>{
                                                return (
                                                    <p key={question.name+tag}>{tag}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </a>
                       )
                   })
               }
                
                
           </div>
                
        </div>
    )
}

export default Room;