import {useEffect,useState} from 'react'
import {Link, useHistory,useParams} from 'react-router-dom'
import './design.css'
import M from 'materialize-css'
function compare(a, b){
    return a.result.problem.rating - b.result.problem.rating;
}
function randomize(a, b) {return Math.random() - 0.5;}
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
    var startTime,endTime;
    const [hours,setHours]=useState(0);
    const [minutes,setMinutes]=useState(0);
    const [seconds,setSeconds]=useState(0);
    const [contestStarted,setContestStarted]=useState(false)
    const [scores, setscores] = useState([]);
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
                endTime=new Date(data.endTiming).getTime()
                // console.log(endTime)

                var clock=setInterval(()=>{
                var now=new Date().getTime();
                var diff=Math.floor((startTime-now)/1000);
                var s=diff%60;
                var min=Math.floor(diff/60) %60;
                var hrs=Math.floor(diff/(60*60)) % 60;

                if(hrs<0 && min<0 && s<0)
                {
                    // console.log('t')
                    // console.log(clock)
                    StartContest()
                    clearInterval(clock)
                    setContestStarted(true)
                    M.toast({
                        html:'Contest started',
                        classes: "#ce93d8 purple",
                        displayLength: 5000,
                    })
                }
                else
                {
                    setSeconds(s)
                    setMinutes(min)
                    setHours(hrs)
                }
                },1000)
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })

        
        

    },[])
    function Scoreboard(){
        let handles=[]
        let nmap = new Map()//for mapping rating to score
        let userscores = []//for mapping user and his/her score
        let i = 0;
        nmap.set(800, 500);
        nmap.set(900, 1000);
        nmap.set(1000, 1500);
        nmap.set(1100, 2000);
        nmap.set(1200, 2500);
        nmap.set(1300, 3000);
        participants.forEach(part=>{
            handles.push(part.codeforces)
        })
        handles.forEach(function(handle){
            if(handle.length == 0 ){
                alert("")
            }
            let score = 0;
            fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=30`)
            .then(response=> response.json())
            .then(data =>{
                let arr = []
                let i = 0;
                data.result.forEach(function(submission){//loop to check the submissions of user
                    let id = submission.problem.contestId.toString() + submission.problem.index;
                    let obj;
                    questionList.forEach(function(question){//loop to check if the user has solved any of the problems given in the contest
                        let id2 =  question.contestId.toString() + question.index;
                        if(id === id2 && submission.verdict === "OK"){
                            obj = question;
                            return;
                        }
                    })
                    if(typeof(obj) === undefined )
                        return;
                    arr[i] = obj;//appending all the problems that are successfully solved
                    i += 1;
                })
                
                arr.forEach(function(submission){//traversing the solved problems and calculating the user's score
                    score += nmap[submission.rating] 
                })
            })
            //mapping the user to his/her score
            userscores[i]= { handle : score };
            i += 1;
        })
        setscores(userscores);
    }
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
            // if(handle.length == 0)
            // {
            //     alert("Please set your codeforces handle");
            //     history.push('/profile');
            // }
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
            data.result.problems.sort(randomize);
            //console.table(data.result.problems);
            data.result.problems.forEach(function(element){
                let id = element.contestId.toString() + element.index;
                let flag = true;
                element.tags.forEach(function(element2){
                    if(element2 === "special problem"){
                        flag = false;
                    }
                })
                if( flag === true && k < 1400 && nmap.get(id) !== true && element.rating === k ){
                    arr[i] = element;
                    i += 1;
                    k += 100;
                }
            });
            
            // setQ2(questionList)
            setQuestionList(arr)
            console.log(questionList);
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
        // var now=new Date().getTime();
            var deadline=new Date(endTime);

            var remainTime=setInterval(()=>{

                var now=new Date().getTime();
                var diff=Math.floor((deadline-now)/1000);
                var s=diff%60;
                var min=Math.floor(diff/60) %60;
                var hrs=Math.floor(diff/(60*60)) % 60;

                if(hrs<0 && min<0 && s<0)
                {
                    M.toast({
                        html:'Contest ended',
                        classes: "#ce93d8 purple",
                        displayLength: 5000,
                    })
                    clearInterval(remainTime)
                }
                else
                {
                    setSeconds(s)
                    setMinutes(min)
                    setHours(hrs)
                }

        },1000)
    }
    
    useEffect(()=>{
        //console.log(questionList);
        
    },[questionList], [setscores])

    let i = -1;
    return (
        <div className="container">
            <h3>Room name: {roomName}</h3>
            <h3>Room Id: {roomId}</h3>
            
            {
                contestStarted
                ?
                    <h3>Time Remaining : {hours}h {minutes}min {seconds}sec</h3>
                :
                    <h3>Before start : {hours}h {minutes}min {seconds}sec</h3>
            }
            <h3>Total participants: {participants.length}</h3>
            <br/>
            <button className='waves-effect waves-light btn-large' onClick={()=>{Refresh()}} style={{margin:'30px'}}>Refresh</button>
            <button className='waves-effect waves-light btn-large' onClick={()=>LeaveRoom()} style={{margin:'30px'}}>Leave Room</button>
            {/* <input type></input> */}
            {/* <button className='btn-large' onClick={()=>StartContest()} style={{margin:'20px'}}>Start Contest</button> */}
            <div>
                <h3>Participants are : </h3>
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
                <br></br>
                <br></br>
                <h2> Problems </h2>
                <br></br>
            </div>
           
            <div className='row' >
                     {
                         
                         questionList.map(question=>{
                             let ID = "ABCDEF";
                             i += 1;
                             return (
                                 
                                      <div className='card'>
                                          <a className='col s4 m4' href={`https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`} 
                                            target='_blank' 
                                            key={question.name}
                                            
                                            >
                                          <div className='card-content card-panel hoverable yellow' style={{height:'200px'}}>
                                              <span className='card-title'><span class="card-text"><strong>{ID[i]}. </strong><strong>{question.name}</strong></span></span>
                                              
                                              {/* {
                                                  question.tags.map((tag)=>{
                                                      return (
                                                          <p key={question.name+tag}>{tag}</p>
                                                      )
                                                  })
                                              } */}
                                             
                                          </div>
                                          </a>  
                                      </div>
                                  
                             )
                         })
                     }
                      
                      
                 
           </div>
                
        </div>
    )
}

export default Room;