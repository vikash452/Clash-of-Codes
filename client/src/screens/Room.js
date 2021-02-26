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
    useEffect(()=>{
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
        let handles = ['umanggupta001122', 'Marcos_0901', 'Lord_Invincible', 'shantys502'];
        let arr = [];
        let i = 0;
        let nmap = new Map();
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
        console.log(nmap);
        let k = 800;
        fetch(`https://codeforces.com/api/problemset.problems`)
        .then(response => response.json())
        .then( data =>{
            //console.log(data);
            data.result.problems.forEach(function(element){
                let id = element.contestId.toString() + element.index;
                if( k < 1600 && nmap.get(id) !== true && element.rating === k ){
                    arr[i] = id;
                    i += 1;
                    k += 100;
                }
            });
            console.log(arr);
        })
        
    },[])

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
    // function GetProblems(){
    //     let handles = ['umanggupta001122', 'Marcos_0901', 'Lord_Invincible', 'shantys502'];
    //     let arr = [];
    //             let i = 0;
    //             let nmap = new Map();
    //     handles.forEach(function(handle){
    //         if(handle.length == 0)
    //         {
    //             alert("Please set your codeforces handle");
    //             history.push('/profile');
    //         }
    //         fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    //         .then(response => response.json())
    //         .then(data =>{
    //             data.result.forEach(function(element){
    //                 nmap.set( element.id, true);
    //             })
    //         })
    //     });
    //     console.log(nmap);
    // }
    return (
        <div>
            <h2>Room name: {roomName}</h2>
            <h2>Room Id: {roomId}</h2>
            <h2>Total participants: {participants.length}</h2>
            <button className='btn-large' onClick={()=>{Refresh()}} style={{margin:'20px'}}>Refresh</button>
            <button className='btn-large' onClick={()=>LeaveRoom()}>Leave Room</button>
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
            
        </div>
    )
}

export default Room;