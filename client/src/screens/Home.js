import { Verify } from 'crypto'
import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import './design.css';
import CF from '../images/cf.jpg'
import Preloader from '../assets/Preloader'
import { use } from 'passport';
import UniqueSubmissions from './user_uniq_subms_cf'

function Home() {


    var [name, setName] = useState('');
    var [upcomingCF, setUpcomingCF] = useState([]);
    var [upcomingCC, setUpcomingCC] = useState([]);
    var [userCFData,setUserCFData]=useState(null)
    var [user,setUser]=useState({})
    var [gotusercf , setGotUserCf]=useState(false)
    // var user;
    const history = useHistory();
    useEffect(async () => {

        var user_temp = JSON.parse(localStorage.getItem('user'))
        setUser(user_temp)
        setGotUserCf(true)
        // console.log(user)
        if (!user_temp) {
            history.push('/signin')
        }
        else {
            setName(user_temp.name)
        }

        fetch('/codechef/upcomingContests',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            data.reverse()
            setUpcomingCC(data)
        })
        .catch((err)=>{
            console.log(err)
        })
        
        fetch('https://codeforces.com/api/contest.list')
        .then(res => res.json())
        .then((data) => {
                // console.log(data)
                var temp = []
                data.result.forEach(element => {
                    if (element.relativeTimeSeconds < 0) {
                        temp.push(element)
                    }

                });
                temp.reverse()
                temp.splice(3, temp.length)
                setUpcomingCF(temp)
        })

        

    }, [])

    useEffect(async ()=>{
        console.log(user)
        if(user && user.codeforces)
        {
            var TotalQuestions=await UniqueSubmissions(user.codeforces)
            var prom=await fetch(`https://codeforces.com/api/user.info?handles=${user.codeforces}`)
            var temp_data=await prom.json()
            console.log(typeof(temp_data))
            var data={
                ...temp_data.result[0],
                total:TotalQuestions.size
            }
            console.log(data)
            setUserCFData(data)
        }
    },[gotusercf])

    
    return (
        <div className="Home-div">
            <div className="msg-div" style={{}}>
                <span className="home-msg">Hi {name},</span>
                {/* <p className="msg-content">Let us help you reach the pinnacle of competitive coding. </p> */}
            </div>

            <div>
                {
                    console.log(userCFData),
                    (gotusercf && (userCFData != null))
                    ?
                    <>
                    </>
                    :
                    <div
                    style={{
                        fontSize:'3rem',
                        backgroundColor:'rgba(64,64,64,0.6)',
                        paddingRight:'30px',
                        paddingLeft:'30px',
                        borderRadius:'20px'
                    }}
                    >
                        <h2>
                            Codeforces
                        </h2>
                        {user.codeforces}
                        <br/>
                        {/* {userCFData.total} on Codeforces */}
                    </div>    
                }
            </div>

            <div className='upcoming_contest_list_div'>
                <div className="home-contests" style={{}}>
                    <h3><ul>Upcoming Contests on Codeforces</ul></h3>
                    {
                        upcomingCF.map(item => {
                            console.log(item)
                            // console.log(item.startTimeSeconds)
                            var startDate = new Date(item.startTimeSeconds * 1000).toLocaleDateString()
                            // var startDate=d.getDate() + ' ' + d.getMonth()+1 + ' ' + d.getFullYear()
                            var startTime = new Date(item.startTimeSeconds * 1000).toLocaleTimeString()
                            return (
                                <h6 key={item.id}>
                                    <a href={`https://codeforces.com/contests/${item.id}`} target='_blank' style={{color:'white'}}>
                                        {item.name}
                                    </a>
                                    
                                    <br></br> {startDate} {startTime}
                                </h6>
                            )
                        })
                    }
                </div>
                
                <div className='home-contests'>
                    <h3><ul>Upcoming Contests on codechef</ul></h3>
                    {
                        upcomingCC.map((item)=>{
                            // console.log(new Date(item.startDate).toDateString())
                            // console.log(item.startDate == item.endDate)
                            var startDate=new Date(item.startDate)
                            var endDate=new Date(item.endDate)
                            console.log(startDate === endDate)
                            return (
                                <h6 key={item.code}>
                                    {item.code} {item.name}
                                    <br/>
                                    {startDate.toDateString()} {startDate.toLocaleTimeString()} to {endDate.toDateString()} {endDate.toLocaleTimeString()}
                                </h6>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
    
    // return (
    //     <>
    //     <Preloader/>
    //     </>
    // )
}

export default Home;