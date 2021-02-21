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
    useEffect(()=>{
        fetch(`/conetst/roomDetails/${roomId}`,{
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
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <div>
            <h2>Room name: {roomName}</h2>
            <h2>Room Id: {roomId}</h2>
        </div>
    )
}

export default Room;