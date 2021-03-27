import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import ing1 from '../images/parallax1.jpg'
import passport, { use } from 'passport';
import './design.css'

import M from 'materialize-css'
import './design.css';
import fetch from 'node-fetch';

//import Parallax from "./Parallax"
// jQuery(document).ready(function(){
//     jQuery('.parallax').parallax();
//   });
function Profile() {
    const history = useHistory();
    var user;
    const [cf, setCf] = useState('');
    const [cc, setCc] = useState('');
    const [leetcode, setLeetcode] = useState('');
    const [searchList, setSearchList] = useState([])
    const [friendList, setFriendList] = useState([])

    var remove=document.querySelector('.remove_user');

    if(remove)
    {
        remove.addEventListener('mouseover',()=>{
        // console.log('hey')
        remove.style.color='red'
        remove.style.fontSize='28px'
        })

        remove.addEventListener('mouseleave',()=>{
        // console.log('hey')
        remove.style.color='rgba(0,0,0,0.6)'
        remove.style.fontSize='24px'
        })
    }
    

    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setCf(user.codeforces)
            // setFriendList(user.friends)
            // console.log(user.friends)
            fetch('/get/handleName', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            })
                .then(res => res.json())
                .then((data) => {
                    // console.log(data)
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        setCf(data.codeforces)
                        setCc(data.codechef)
                        setLeetcode(data.leetcode)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            fetch('/user/getFriendList',{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res=>res.json())
            .then((data)=>{
                // console.log(data)
                setFriendList(data.friends)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else {
            history.push('/signin')
        }
    }, [user])


    function addCfHandle(platform) {
        fetch('/post/handles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                platform,
                handle: cf
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
                        html: 'handle set successfully',
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                    setCf(data.codeforces)
                    localStorage.setItem('user', JSON.stringify(data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function addCcHandle(platform) {
        console.log(platform)
        fetch('/post/handles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                platform,
                handle: cc
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
                        html: 'handle set successfully',
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                    setCc(data.codechef)
                    localStorage.setItem('user', JSON.stringify(data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function friendSearch(pattern) {
        // console.log(pattern.length == 0)
        if (!pattern.startsWith(' ') && !(pattern.length == 0)) {
            fetch(`/user/searchFriend/${pattern}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
            })
                .then(res => res.json())
                .then((data) => {
                    // console.log(data)
                    setSearchList(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        if (pattern.length == 0) {
            setSearchList([])
        }
    }

    function AddFriend(friendID) {
        fetch(`/user/addFriend/${friendID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
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
                    M.toast({
                        html: 'Friend added successfully',
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                    setFriendList(data.friends)
                    // user = JSON.parse(localStorage.setItem('user', JSON.stringify(data)))
                    localStorage.setItem('user', JSON.stringify(data));
                }
            })

            .catch((err) => {
                console.log(err)
            })
        console.log(friendList);
    }

    function RemoveFriend(friendID,friendName)
    {
        fetch(`/user/removeFriend/${friendID}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            if (data.error) {
                // console.log(data.error)
                M.toast({
                    html: data.error,
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                })
            }
            else {
                M.toast({
                    html:  `${friendName} removed successfully`,
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                })
                setFriendList(data.friends)
                // user = JSON.parse(localStorage.setItem('user', JSON.stringify(data)))
                localStorage.setItem('user', JSON.stringify(data));
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    // var url=new URL('/compare?ab=a&bc=b')
    return (
        <div >
            {/* <div style={{ marginTop: '70px' }}> */}

            <div style={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                padding: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                flexwrap: 'wrap',
                zindex: '1'
            }}>
                <div className="card-container card" style={{
                    position: 'relative',
                    width: '50%',
                    minWidth: '50%',
                    //minWidth: '420px',
                    margin: '30px',
                    padding: '30px',
                    boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.667)',
                    borderRadius: '15px',
                    background: 'rgba(230, 236, 233, 0.35)',
                    overflow: 'hidden',
                    color: '#e6ff02',
                    borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(5px)'
                }}>
                    <h2 stle={{ marginTop: '1.424rem' }}>Add a friend </h2>
                    <input type='text' placeholder='search for friend'
                        style={{ maxWidth: '300px', margin: 'auto' }}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            friendSearch(e.target.value)
                        }} />

                    <ul className='collection green' style={{ maxWidth: '300px', margin: 'auto' }} >
                        {
                            searchList.map((item) => {
                                return (
                                    <div key={item._id}>
                                        <li className='collection-item'><span style={{ color: 'black' }}>{item.name}</span> &emsp; <Link to='/profile' onClick={() => { AddFriend(item._id) }} >Add as friend</Link ></li>
                                    </div>
                                )
                            })
                        }
                    </ul>
                    <h4>Your total friends are :  {friendList.length}</h4>
                    {
                        friendList.map((friend) => {
                            // console.log(friend._id)
                            return (
                                <div  key={friend._id} className='chip' style={{display:'block' ,maxWidth:'fit-content', margin:'auto', marginBottom:'5px'}}> 
                                    <span>{friend.name}  <i alt='Remove user' onClick={()=>{RemoveFriend(friend._id,friend.name)}}   className="material-icons remove_user">remove_circle_outline</i></span> 
                                </div >
                            )

                        })
                    }
                </div>

            </div>
            <br></br>
            <br></br>
            <div style={{
                position: 'relative',
                display: 'flex',
                //margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
                flexwrap: 'wrap',
                zindex: '1'
            }}>
                <div className="card-container card" style={{
                    position: 'relative',
                    width: 'clamp(320px, 65%, 65%)',
                    //minWidth: '420px',
                    padding: '30px',
                    margin: '30px',
                    height: '110vh',
                    boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.667)',
                    borderRadius: '15px',
                    background: 'rgba(230, 236, 233, 0.35)',
                    overflow: 'hidden',
                    color: '#e6ff02',
                    borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(5px)'
                }}>
                    <h2 stle={{ marginTop: '1.424rem' }}>Your Codeforces Profile</h2>
                    <h4>Your current Codeforces handle is : {cf}</h4>
                    {
                        cf
                        &&
                        // <button className='waves-effect waves-light btn-large'>
                        //     <Link to='/codeforces' style={{ color: 'white', marginBottom: '80px' }}>
                        //     Click here to see your statistics</Link>
                        //     </button>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexwrap: 'wrap',
                        }}>
                            <Link to='/codeforces'>
                                <button className="blobby-button" style={{
                                    fontSize: '1.1rem',
                                    marginTop: '1rem',
                                }}>Click here to see your statistics<span className="inner">
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
                            </Link>
                        </div>

                    }
                    <br></br>

                    <h4>OR</h4>

                    <br></br>
                    <input type='text' placeholder='codeforces handle' style={{ maxWidth: '300px' }} id='cf_handle_input'
                        onChange={(e) => {
                            setCf(e.target.value)
                        }}
                    />
                    <br />
                    {/* <button className='btn-large' style={{ marginTop: '10px' }} onClick={() => { addCfHandle('codeforces') }}>Set codeforces handle</button> */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexwrap: 'wrap',
                    }}>
                        <button className="blobby-button" onClick={() => { addCfHandle('codeforces') }} style={{
                            fontSize: '1.1rem',
                        }}>Set this as Codeforces handle <span className="inner">
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

                <div className="card-container card" style={{
                    position: 'relative',
                    width: 'clamp(320px, 65%, 65%)',
                    //minWidth: '420px',
                    margin: '30px',
                    padding: '30px',
                    height: '110vh',
                    boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.667)',
                    borderRadius: '15px',
                    background: 'rgba(230, 236, 233, 0.35)',
                    overflow: 'hidden',
                    color: '#e6ff02',
                    borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(5px)'
                }}>
                    <h2 stle={{ marginTop: '1.424rem' }}>Your CodeChef Profile</h2>
                    <h4>Your current Codechef handle is : {cc}</h4>

                    {
                        cc
                        &&
                        // <button className='waves-effect waves-light btn-large'>
                        //     <Link to='/codechef' style={{ color: 'white', marginBottom: '80px' }}>
                        //     Click here to see your statistics</Link>
                        //     </button>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexwrap: 'wrap',
                        }}>
                            <Link to='/codechef'>
                                <button className="blobby-button" style={{
                                    fontSize: '1.1rem',
                                    marginTop: '1rem',
                                }}>Click here to see your statistics<span className="inner">
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
                            </Link>
                        </div>

                    }
                    <br></br>

                    <h4>OR</h4>

                    <br></br>
                    <input type='text' placeholder='codechef handle' style={{ maxWidth: '300px' }} id='cc_handle_input'
                        onChange={(e) => {
                            setCc(e.target.value)
                        }}
                    />
                    <br />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexwrap: 'wrap',
                    }}>
                        <button className="blobby-button" onClick={() => { addCcHandle('codechef') }} style={{
                            fontSize: '1.1rem',
                        }}>Set this as Codechef handle <span className="inner">
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
                    {/* <button className='btn-large' style={{ marginTop: '10px' }} onClick={() => { addCcHandle('codechef') }}>Set codechef handle</button> */}

                </div>


            </div>
            {/* <div style={{
                position: 'relative',
                width: 'clamp(320px, 65%, 65%)',
                //minWidth: '420px',
                height: '80vh',
                padding: '30px',
                margin: '30px',
                boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.667)',
                borderRadius: '15px',
                background: 'rgba(230, 236, 233, 0.35)',
                overflow: 'hidden',
                color: '#e6ff02',
                borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(5px)'
            }}>
                <div>
                    <h3>Your current codechef handle is : {cc}</h3>
                    <h3>Your current leetcode handle is : {leetcode}</h3>

                </div>
            </div> */}
            <Link to='/compare'>Compare</Link>
        </div>
    )
}

export default Profile;