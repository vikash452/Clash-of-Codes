import {useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function Contest()
{
    const [roomName,setRoomName]=useState('');
    const [joinRoom,setJoinRoom]=useState('');
    const [startTime,setStartTime]=useState(Date);
    const [endTime,setEndTime]=useState(Date)
    const [initialRating,setInitialRating]=useState(800)
    const history=useHistory()

    useEffect(()=>{
        var select_tag=document.querySelectorAll('select');
        var instances = M.FormSelect.init(select_tag);
    },[])

    function CreateRoom()
    {
        fetch('/contest/createRoom',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                name:roomName,
                startTiming:startTime,
                endTiming:endTime,
                initialRating,
            })
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
                M.toast({
                html:`room Id is : ${data.roomId}`,
                classes: "#ce93d8 purple",
                displayLength: 5000,
                })

                M.toast({
                html:`Now join the room with the id`,
                classes: "#ce93d8 purple",
                displayLength: 4000,
                })

                setJoinRoom(data.roomId)
                
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function Join()
    {
        // console.log(joinRoom)
        fetch(`/contest/joinRoom/${joinRoom}`,{
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
                // console.log(data.error)
                M.toast({
                html:data.error,
                classes: "#ce93d8 purple",
                displayLength: 1000,
                })
            }
            else
            {
                history.push(`/room/${joinRoom}`)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div style={{ display:'flex', justifyContent:"space-evenly", alignItems:'center'}}>
            <div style={{backgroundColor:'rgb(171, 49, 233)', border:'20px ridge white', borderRadius:'60px', marginTop:'10px', marginRight:'20px'}}>
                <h3>Create  a room</h3>
                <p style={{fontSize:'20px'}}>Set the room name :
                <input type='text' placeholder='Room name' style={{maxWidth:'300px', marginLeft: '10px'}}
                onChange={(e)=>{
                    setRoomName(e.target.value)
                }}
                /></p>
                <p style={{fontSize:'20px'}}>Set the Contest start time :
                    <input type='datetime-local' placeholder='Contest start time' style={{maxWidth:'300px', marginLeft:'10px'}}  
                    onChange={(e)=>{
                        setStartTime(new Date(e.target.value))
                        var now=new Date(e.target.value)
                        // console.log(now)
                        var end=new Date()
                        end.setTime(now.getTime() + 2*60*60*1000)
                        // console.log(end)
                        setEndTime(end)
                    }}
                /></p>
                
                <p style={{width:'400px', margin:'auto', fontSize:'20px'}}>
                    Set the starting question rating
                    <select onChange={(e)=>{
                        setInitialRating(e.target.value)
                    }} >
                        <option value={800}>800</option>
                        <option value={900}>900</option>
                        <option value={1000}>1000</option>
                        <option value={1100}>1100</option>
                        <option value={1200}>1200</option>
                        <option value={1300}>1300</option>
                    </select>
                </p>
                
                <br/>
                <button className="waves-effect waves-light btn-large" style={{marginTop: '5px', marginBottom : '7px'}}onClick={()=>{CreateRoom()}}>Create</button>
            </div>
            
            <div style=
            {{backgroundColor:'rgb(171, 49, 233)', 
            border:'20px ridge white', 
            borderRadius:'60px', 
            marginLeft:'20px',
            display:'flex',
            alignItems:'center'
            }}>
                <h3>Join a room</h3>
                <input type='text' placeholder='Room Id' style={{maxWidth:'300px'}} value={joinRoom}
                onChange={(e)=>{
                    setJoinRoom(e.target.value)
                }}
                />
                <button className="waves-effect waves-light btn-large" style={{marginLeft: '10px'}} onClick={()=>{Join()}}>Join</button>
            </div>
        </div>
    )
}

export default Contest;