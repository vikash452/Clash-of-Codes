import {useEffect,useState} from 'react'
import {Link, useHistory,useParams} from 'react-router-dom'
import './design.css'
import M from 'materialize-css'
import Background from '../images/img2.png'


function compare(a, b){
    return a.result.problem.rating - b.result.problem.rating;
}

function randomize(a, b) {
    // var x=Math.floor(new Date()/1000);
    // if(x%10 == 0)
    // return 0;
    // else if(x%2 == 0)
    return 1;
    // else
    // return -1;
}

function Room()
{
    var temp_2d=new Array

    const history=useHistory();
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState('');
    const [participants,setParticipants]=useState([])
    // var participants=[]
    const [questionList,setQuestionList]=useState([])
    const [q2,setQ2]=useState([])
    var startTime,endTime;
    const [hours,setHours]=useState(0);
    const [minutes,setMinutes]=useState(0);
    const [seconds,setSeconds]=useState(0);
    const [contestStarted,setContestStarted]=useState(false)
    const [scores, setscores] = useState([]);
    const [questions_loaded_percentage,setQuestionsPercentage]=useState(0.0)
    const [resultCard,setResultCard]=useState([])
    const [start_timings,set_Start_timings]=useState(0)
    const [initialRating,setInitialRating]=useState(800)
    const [inRoom,setInRoom]=useState(false);
    var IR;
    var isAdmin=false;
    var user;
    // var initialRating=800;

    useEffect(()=>{
        // console.log(Math.floor(new Date()/1000))
        
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
            if(data.error)
            {
                alert('no such room exists')
                history.push('/home')
            }
            else
            {
                setRoomName(data.name)
               
                setParticipants(data.participants)
                setInitialRating(data.initialRating)
                console.log(data.initialRating)
                IR=data.initialRating
                // console.log(initialRating)

                if(user.email == data.adminEmail)
                    isAdmin=true

                startTime=new Date(data.startTiming).getTime()
                endTime=new Date(data.endTiming).getTime()
                set_Start_timings(data.startTiming)

                var clock=setInterval(()=>{
                var now=new Date().getTime();
                var diff=Math.floor((startTime-now)/1000);
                var s=diff%60;
                var min=Math.floor(diff/60) %60;
                var hrs=Math.floor(diff/(60*60)) % 60;

                if(hrs<0 && min<0 && s<0)
                {
                    setContestStarted(true)
                    clearInterval(clock)
                    if(inRoom)
                    {
                        M.toast({
                        html:'Contest started',
                        classes: "#ce93d8 purple",
                        displayLength: 5000,
                        })
                    }
                    
                    StartContest(true)
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

        
        

    },[initialRating])

    function Scoreboard(){

        var total_questions=5;
        var total_participants=participants.length;
        var score_card=new Array(total_participants);
        for(var i=0; i<total_participants; ++i)
        {
            score_card[i]=new Array(total_questions);      // 5 because we are giving 5 questions
            for(var j=0; j<total_questions; ++j)
            {
                score_card[i][j]=0;
            }
        }
        // console.log()

        var handles=[];

        participants.forEach(part=>{
            handles.push(part.codeforces)
        })

        var questions_map=new Map();
        questionList.forEach((ques,index)=>{
            var id=ques.contestId.toString() + ques.index
            questions_map.set(id,index);
        })

        // console.log(questions_map)
        FillHandles(0)

        function FillHandles(index)
        {
            if(index >= total_participants)
            {
                setResultCard(score_card)
                // // resultCard=score_card
                // console.log(resultCard)
                // console.log('stopping')
                return;
            }

            fetch(`https://codeforces.com/api/user.status?handle=${handles[index]}&from=1&count=100`)
            .then(res=>res.json())
            .then((data)=>{
                data.result.forEach((item)=>{
                    var id=item.problem.contestId.toString() + item.problem.index;
                    if(questions_map.has(id))
                    {
                        var questionIndex=questions_map.get(id);
                        // console.log(questionIndex)

                        if(score_card[index][questionIndex] == -1 || score_card[index][questionIndex] == 0)
                        {
                            if(item.verdict === 'OK')
                            {
                                var x=Math.floor(new Date(start_timings)/1000)
                                var y=item.creationTimeSeconds
                                // console.log(y)
                                var min=(Math.floor((y-x)/(60)))%60;
                                var hrs=Math.floor(min/60)
                                score_card[index][questionIndex]=hrs + ':' + min;
                            }
                            else
                            {
                                score_card[index][questionIndex]=-1;
                            }
                        }

                        
                    }
                    
                })
                FillHandles(index+1)
            })

        }
    }

    function FillHandles(index,nmap,handles,totalParticipants)
    {
        if(index >= totalParticipants)
        {
            GetProblems(nmap)
            return;
        }

        var limit=Math.min(totalParticipants-index,4);
        var calls=0;

        fetch(`https://codeforces.com/api/user.status?handle=${handles[index]}`)
        .then(response => response.json())
        .then(data =>{
            data.result.forEach(function(element){
                let id = element.problem.contestId.toString() + element.problem.index;
                // if( element.verdict === "OK")
                    nmap.set( id, true);
            })
            ++index
            setQuestionsPercentage(Math.trunc((index/(totalParticipants+1))*100))
            FillHandles(index,nmap,handles,totalParticipants);
        })
        // setInterval(()=>{

        // },21)

    }

    function GetProblems(nmap)
    {   
        // console.log('get problems called')
        let arr = [];
        let k = IR;
        console.log(k)
        fetch(`https://codeforces.com/api/problemset.problems`)
        .then(response => response.json())
        .then( data =>{
            //console.log(data);
            data.result.problems.sort(randomize);
            //console.table(data.result.problems);
            var total=0;
            data.result.problems.forEach(function(element){
                let id = element.contestId.toString() + element.index;
                let flag = true;

                element.tags.forEach(function(element2){
                    if(element2 === "special problem"){
                        flag = false;
                    }
                })
                if( flag === true && nmap.get(id) != true && element.rating == k && total<=5 ){
                    console.log(element)
                    // arr[i] = element;
                    arr.push(element)
                    // i += 1;
                    k += 100;
                    ++total;
                }
            });
            
            // setQ2(questionList)
            setQuestionList(arr)
            // console.log(new Date().toUTCString())
            // console.log(questionList);
        })
    }

    function FilterProblems(participants_array)
    {
        let i = 0;
        let nmap = new Map();
        // let handles = ['umanggupta001122', 'Marcos_0901', 'Lord_Invincible', 'shantys502', 'DLN','mexomerf','jainanshika193'];
        let handles=[]
        participants_array.forEach((part)=>{
            handles.push(part.codeforces)
        })
        // console.log(handles)

        var totalParticipants=handles.length;

        FillHandles(0,nmap,handles,totalParticipants)

    }
    
    function Refresh(contestStarted)
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
            if(data.error)
            {
                alert('no such room exists')
                history.push('/home')
            }
            else
            {   
                setRoomName(data.name)
                setParticipants(data.participants)
                // initialRating=data.initialRating;
                // setInitialRating(data.initialRating)
                if(contestStarted)
                {
                    // GetProblems(data.participants);
                    // console.log(new Date().toUTCString())
                    FilterProblems(data.participants)
                }
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

    function StartContest(contestStarted)
    {
        Refresh(true)
        // GetProblems()
        // var now=new Date().getTime();
            var deadline=new Date(endTime);

            var remainTime=setInterval(()=>{

                var now=new Date().getTime();
                var diff=Math.floor((deadline-now)/1000);
                var s=diff%60;
                var min=Math.floor(diff/60) %60;
                var hrs=Math.floor(diff/(60*60)) % 60;

                if(hrs<0 && min<0 && s<0 && inRoom)
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
    
    function Entry_into_room()
        {
            var user=JSON.parse(localStorage.getItem('user'))   
            var found=false;
            for(var i=0; i<participants.length; ++i)
            {
                if(participants[i].email == user.email)
                {
                    found=true;
                    break;
                }
            }

            if(found == false)
            {
                fetch(`/contest/joinRoom/${roomId}`,{
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
                        // history.push(`/room/${joinRoom}`)
                        setInRoom(true)
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            else
            {
                setInRoom(true)
            }

        }

    let i = -1;
    var index_scoreboard=100;
    
    var time=new Date(start_timings).toLocaleString()
    return (
        <div>
            {/* if in room */}
            <div className="container" style={{display:inRoom?'':'none'}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{width:'60%'}}>
                        <h4>Room name: {roomName}</h4>
                        <h4>Room Id: {roomId}</h4>
                        
                        {
                            contestStarted && hours >=0 && minutes>=0 && seconds>=0
                            ?
                                <h3>Time Remaining : {hours}h {minutes}min {seconds}sec</h3>
                            :
                                <h3>Before start : {hours}h {minutes}min {seconds}sec</h3>
                        }
                        <h3>Total participants: {participants.length}</h3>
                    </div>

                    <div style={{width:'40%'}}>
                        <div style={{paddingTop:'50px'}}>
                        {
                            participants.map((part)=>{
                                // console.log(part)
                                return (
                                        <div key={part._id} className='chip'>
                                            {part.name}
                                        </div>
                                    )
                                })
                        }
                        </div>

                        <div style={{display:'flex'}}>
                            <button className='waves-effect waves-light btn-large' onClick={()=>{Refresh(false)}} style={{margin:'30px',minWidth:'fit-content'}}>Refresh</button>
                            <button className='waves-effect waves-light btn-large' onClick={()=>LeaveRoom()} style={{margin:'30px',minWidth:'fit-content'}}>Leave Room</button>
                        </div>
                        

                    </div>
                    
                </div>
                
                <h2> Problems </h2>
                <br></br>
                
                {
                    contestStarted
                    ?
                        questionList.length == 0
                        ?
                        <h1>Loading questions {questions_loaded_percentage} %</h1>
                        :
                        <></>
                    :
                    <></>
                }
            
                <div className='row' >
                        {
                            
                            questionList.map(question=>{
                                let ID = "ABCDEF";
                                i += 1;
                                return (
                                        <div className='card' key={question.name}>
                                            <a className='col s4 m4' href={`https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`} 
                                                target='_blank' 
                                                
                                                
                                                >
                                            <div className='card-content card-panel hoverable yellow' style={{height:'200px'}}>
                                                <span className='card-title'><span className="card-text"><strong>{ID[i]}. </strong><strong>{question.name}</strong></span></span>
                                                
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
                    
                {/* Scoreboard */}
                <div style={{backgroundColor:'white', color:'violet', textAlign:'center', boxShadow:'5px 10px 10px black'}}>
                    <table>
                        <thead>
                            <tr>
                                {
                                    contestStarted
                                    ?
                                        <td width={'186.444px'} style={{textAlign:'center'}}>{hours}h {minutes}min {seconds}sec</td>
                                    :
                                        <td width={'186.444px'}></td>
                                }
                                {
                                    questionList.map((ques,index)=>{
                                        return (
                                            <td key={ques.name} style={{textAlign:'center'}}>{String.fromCharCode(65+index)}</td>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                            resultCard.map((item,ide2)=>{
                                return (
                                    <tr key={ide2}>
                                        <td style={{textAlign:'center'}}>
                                            {participants[ide2].name}
                                        </td>
                                        {
                                            item.map((scores,index)=>{
                                                var color_of_cell='lightgray';
                                                var time=0;
                                                scores==0
                                                    ?
                                                    color_of_cell='lightgray'
                                                    :
                                                        scores!=-1
                                                        ?
                                                            color_of_cell='lightgreen'
                                                        :
                                                        color_of_cell='lightsalmon'
                                                        
                                                return (
                                                    <td key={index} style={{backgroundColor:color_of_cell, color:'black', textAlign:'center'}}>
                                                        {scores}    
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                                })
                            }
                        </tbody>
                        
                    </table>
                    <button className='btn btn-large toggle' onClick={()=>{Scoreboard()}}>Update Scoreboard</button>
                </div>
            </div>
            
            {/* if not in room */}
            <div style={{
                display:inRoom?'none':'flex',
                marginTop:'200px', 
                justifyContent:'center', 
                alignContent:'center', 
                alignSelf:'center'
                }}>
                    	<div 
                        style={{
                            backgroundColor:'burlywood', 
                            height:'400px', 
                            width:'500px', 
                            marginLeft:'20px', 
                            marginRight:'40px',
                            borderRadius:'20px',
                            boxShadow:'10px 10px 10px black',
                            opacity:'0.95',
                            backgroundImage:`url(${Background})`
                        }}>
                        <h2>{roomName}</h2>
                        <h4>Contest start timing : {time}</h4>
                        <h4>Initial Question Rating : {initialRating}</h4>
                        </div>
                        <button
                        className='btn btn-large' 
                        style={{marginTop:'auto', marginBottom:'auto'}}
                        onClick={()=>{Entry_into_room()}}>Enter the room</button>
            </div>
        </div>
    )
}

export default Room;