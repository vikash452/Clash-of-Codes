import {useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import ing1 from '../images/parallax1.jpg'
import passport, { use } from 'passport';
import './design.css'

import M from 'materialize-css'
import './design.css';

//import Parallax from "./Parallax"
// jQuery(document).ready(function(){
//     jQuery('.parallax').parallax();
//   });
function Profile()
{
    const history=useHistory();
    var user;
    const [cf,setCf]=useState('');
    const [cc,setCc]=useState('');
    const [leetcode,setLeetcode]=useState('');
    const [searchList,setSearchList]=useState([])
    const [friendList,setFriendList]=useState([])

    useEffect(()=>{
        user=JSON.parse(localStorage.getItem('user'))
        if(user)
        {
            setCf(user.codeforces)
            setFriendList(user.friends)
            fetch('/get/handleName',{
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
                    console.log(data.error);
                }
                else
                {
                    setCf(data.codeforces)
                    setCc(data.codechef)
                    setLeetcode(data.leetcode)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else
        {
            history.push('/signin')
        }
    },[user])
    

    function addCfHandle(platform)
    {
        fetch('/post/handles',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                platform,
                handle:cf
            })
            })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data)
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
                    html:'handle set successfully',
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                    })
                    setCf(data.codeforces)
                    localStorage.setItem('user',JSON.stringify(data))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    function addCcHandle(platform)
    {
        console.log(platform)
        fetch('/post/handles',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                platform,
                handle:cc
            })
            })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data)
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
                    html:'handle set successfully',
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                    })
                    setCc(data.codeforces)
                    localStorage.setItem('user',JSON.stringify(data))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    function friendSearch(pattern)
    {
        // console.log(pattern.length == 0)
        if(!pattern.startsWith(' ') && !(pattern.length == 0))
        {
            fetch(`/user/searchFriend/${pattern}`,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + localStorage.getItem('jwt')
                },
            })
            .then(res=>res.json())
            .then((data)=>{
                // console.log(data)
                setSearchList(data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        if(pattern.length == 0)
        {
            setSearchList([])
        }
    }

    function AddFriend(friendEmail)
    {
        fetch(`/user/addFriend/${friendEmail}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            },
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
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
                M.toast({
                html:'Friend added successfully',
                classes: "#ce93d8 purple",
                displayLength: 1000,
                })
                setFriendList(data.friends)
                user=JSON.parse(localStorage.setItem('user',JSON.stringify(data)))
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    
    
    return (
        <div style={{justifyContent:'center'}} >
            <div style={{marginTop: '70px'}}>
                <input type='text' placeholder='search for friend' style={{maxWidth:'300px'}}
                onChange={(e)=>{
                    // console.log(e.target.value)
                    friendSearch(e.target.value)
                }} />
                <ul className='collection green' style={{maxWidth:'300px', margin:'auto'}} >
                    {
                        searchList.map((item)=>{
                            return (
                                <div key={item._id}>
                                    <li className='collection-item'><span style={{color:'black'}}>{item.name}</span> &emsp; <Link to='/profile' onClick={()=>{AddFriend(item.email)}} >Add as friend</Link ></li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>  
            <br></br>
            <br></br>
            <div>
                <input type='text' placeholder='codeforces handle' style={{maxWidth:'300px'}} id='cf_handle_input'
                onChange={(e)=>{
                    setCf(e.target.value)
                }}
                />
                <br/>
                <button className='btn-large' style = {{marginTop : '10px'}}onClick={()=>{addCfHandle('codeforces')}}>Set codeforces handle</button>
                <h3>Your current Codeforces handle is : {cf}</h3>

                {
                    cf 
                    &&
                    <button className='waves-effect waves-light btn-large'><Link to='/codeforces' style={{color: 'white', marginBottom: '80px'}}>Click here to see your statistics</Link></button>
                }
                
            </div>  

            <div className = "parallax1"></div>

            <div>
                <input type='text' placeholder='codechef handle' style={{maxWidth:'300px'}} id='cc_handle_input'
                onChange={(e)=>{
                    setCc(e.target.value)
                }}
                />
                <br/>
                <button className='btn-large' style = {{marginTop : '10px'}} onClick={()=>{addCcHandle('codechef')}}>Set codechef handle</button>
                <h3>Your current Codechef handle is : {cc}</h3>

                {
                    cc
                    &&
                    <button className='waves-effect waves-light btn-large'><Link to='/codechef' style={{color: 'white', marginBottom: '80px'}}>Click here to see your statistics</Link></button>
                }
                
            </div>  
            
            <div className = "parallax1"></div>
            
            <div>
                <div>
                    <h3>Your current codechef handle is : {cc}</h3>
                    <h3>Your current leetcode handle is : {leetcode}</h3>
                    <h3>Your total friends are :  {friendList.length}</h3>
                </div>
            </div>
            <div className = "parallax2"></div>
        </div>
    )
}

export default Profile;