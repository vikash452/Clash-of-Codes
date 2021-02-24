import {useEffect,useState} from 'react'
import {Link, useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'

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