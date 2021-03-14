import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function Contest() {
    const [roomName, setRoomName] = useState('');
    const [joinRoom, setJoinRoom] = useState('');
    const [startTime, setStartTime] = useState(Date);
    const [endTime, setEndTime] = useState(Date)
    const [initialRating, setInitialRating] = useState(800)
    const history = useHistory()

    useEffect(() => {
        var select_tag = document.querySelectorAll('select');
        var instances = M.FormSelect.init(select_tag);
    }, [])

    function CreateRoom() {
        fetch('/contest/createRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                name: roomName,
                startTiming: startTime,
                endTiming: endTime,
                initialRating,
            })
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                if (data.error) {
                    M.toast({
                        html: data.error,
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                }
                else {
                    M.toast({
                        html: `room Id is : ${data.roomId}`,
                        classes: "#ce93d8 purple",
                        displayLength: 5000,
                    })

                    M.toast({
                        html: `Now join the room with the id`,
                        classes: "#ce93d8 purple",
                        displayLength: 4000,
                    })

                    setJoinRoom(data.roomId)

                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function Join() {
        // console.log(joinRoom)
        fetch(`/contest/joinRoom/${joinRoom}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                if (data.error) {
                    // console.log(data.error)
                    M.toast({
                        html: data.error,
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                }
                else {
                    history.push(`/room/${joinRoom}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '1200px',
            flexwrap: 'wrap',
            zindex: '1',
            margin:'auto'
        }}>
            {/* <div style={{ backgroundColor: 'rgb(171, 49, 233)', border: '20px ridge white', borderRadius: '60px', marginTop: '10px', marginRight: '20px' }}> */}
            <div style={{
                position: 'relative',
                width: '600px',
                //minWidth: '420px',
                height: '550px',
                margin: '30px',
                boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.667)',
                borderRadius: '15px',
                background: 'rgba(230, 236, 233, 0.35)',
                overflow: 'hidden',
                color: '#e6ff02',
                borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(5px)'
            }}>
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Ez5s-PAoYK0CVTeJGFq2SZiFda20WS1n4w&usqp=CAU" style={{
                    width: '100%',
                    height: '35%'
                }}></img> */}
                <h3>Create  a room</h3>
                <p style={{ fontSize: '1.5rem' }}>Set the room name :
                <br></br>
                    <input type='text' placeholder='Room name' style={{ maxWidth: '300px', marginLeft: '10px' }}
                        onChange={(e) => {
                            setRoomName(e.target.value)
                        }}
                    /></p>
                <p style={{ fontSize: '1.5rem' }}>Set the Contest start time :
                <br></br>
                    <input type='datetime-local' placeholder='Contest start time' style={{ maxWidth: '300px', marginLeft: '10px' }}
                        onChange={(e) => {
                            setStartTime(new Date(e.target.value))
                            var now = new Date(e.target.value)
                            // console.log(now)
                            var end = new Date()
                            end.setTime(now.getTime() + 2 * 60 * 60 * 1000)
                            // console.log(end)
                            setEndTime(end)
                        }}
                    /></p>

                <p style={{ width: '400px', margin: 'auto', fontSize: '1.5rem' }}>
                    Set the starting question rating
                    <select onChange={(e) => {
                        setInitialRating(e.target.value)
                    }} >
                        <option value={800}>800</option>
                        <option value={900}>900</option>
                        <option value={1000}>1000</option>
                        <option value={1100}>1100</option>
                        <option value={1200}>1200</option>
                        <option value={1300}>1300</option>
                        <option value={1400}>1400</option>
                        <option value={1500}>1500</option>
                        <option value={1600}>1600</option>
                    </select>
                </p>
                <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button className="blobby-button" onClick={() => { CreateRoom() }} style={{
                        margin: '0 auto',
                        position: 'absolute',
                        fontSize: '1.3rem',

                    }}>Create Room <span className="inner">
                            <span className="blobs">
                                <span className="blob"></span>
                                <span className="blob"></span>
                                <span className="blob"></span>

                                <span
                                    className="blob"></span>
                            </span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                        result="goo"></feColorMatrix>
                                    <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                </filter>
                            </defs>
                        </svg>
                    </button>
                </div>

            </div>

            <div style=
                {{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    flexwrap: 'wrap',
                    zindex: '1'
                }}>
                <div style={{
                    position: 'relative',
                    width: '400px',
                    //minWidth: '420px',
                    height: '300px',
                    margin: '30px',
                    boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.667)',
                    borderRadius: '15px',
                    background: 'rgba(230, 236, 233, 0.35)',
                    overflow: 'hidden',
                    color: '#e6ff02',
                    borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(5px)'
                }}>
                    <h3>Join a room</h3>
                <input type='text' placeholder='Room Id' style={{ width: '300px' }} value={joinRoom}
                    onChange={(e) => {
                        setJoinRoom(e.target.value)
                    }}
                />
                <br></br>
                <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button className="blobby-button" onClick={() => { Join() }} style={{
                        margin: '0 auto',
                        position: 'absolute',
                        fontSize: '1.3rem',

                    }}>Join<span className="inner">
                            <span className="blobs">
                                <span className="blob"></span>
                                <span className="blob"></span>
                                <span className="blob"></span>

                                <span
                                    className="blob"></span>
                            </span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                        result="goo"></feColorMatrix>
                                    <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                </filter>
                            </defs>
                        </svg>
                    </button>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Contest;