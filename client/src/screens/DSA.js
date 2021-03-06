import {useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function DSA()
{

    
    const [topic,setTopic]=useState('greedy');
    const [difficulty,setDifficulty]=useState('easy')
    const [questions,setQuestions]=useState([])
    const [alreadySolved,setAlreadySolved]=useState([])
    // var alreadySolved=[]
    var user;

    useEffect(()=>{
        var elems=document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
        user=JSON.parse(localStorage.getItem('user'))
        // console.log(user.dsaQuestion.includes('abc'))
        // setAlreadySolved(user.dsaQuestion)
        var temp=[]
        user.dsaQuestion.forEach((qu)=>{
            // console.log(qu._id)
            temp.push(qu._id)
        })

        // console.log(temp)
        // console.log(alreadySolved)
        setAlreadySolved(temp)

    },[])

    function GetQuestions()
    {
        // console.log(alreadySolved)
        fetch(`/question/getQuestion?topic=${topic}&difficulty=${difficulty}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            setQuestions(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function MarkAsDone(questionID)
    {
        fetch('/question/markAsDone',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                id:questionID
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            // setQuestions(data)
            if(!data.error)
            {
                localStorage.setItem('user',JSON.stringify(data))
                user=data
                var temp=alreadySolved; 
                setAlreadySolved([
                    ...alreadySolved,
                    questionID
                ])
                // console.log(alreadySolved)
            }
            else
            {
                console.log(data)
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function Undone(questionID)
    {
        // console.log(alreadySolved)
        fetch('/question/undone',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                id:questionID
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            // setQuestions(data)
            if(!data.error)
            {
                localStorage.setItem('user',JSON.stringify(data))
                user=data
                // var temp=alreadySolved
                var temp=alreadySolved.filter((item)=>{
                    return item!=questionID
                })
                // temp.pull(questionID

                setAlreadySolved(temp)
            }
            else
            {
                console.log(data)
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <h2>You will be able to practice DSA questions here</h2>
            {/* <div style={{display:'flex' , justifyContent:'space-evenly'}}> */}
                {/* <div style={{width:'600px'}}> */}
                <div>
                    <h3>Here you can practice questions based on the topic</h3>

                    <div style={{width:'400px', margin:'auto'}}>
                        <select onChange={(e)=>{
                            setTopic(e.target.value)
                        }}>
                            <option value={'greedy'}>Greedy</option>
                            <option value={'dp'}>DP</option>
                            <option value={'bitmasking'}>Bit Masking</option>
                            <option value={'stacks'}>Stacks</option>
                            <option value={'queues'}>Queues</option>
                            <option value={'array'}>Arrays</option>
                            <option value={'string'}>Strings</option>
                            <option value={'sorting'}>Sorting</option>
                            <option value={'graphs'}>Graphs</option>
                            <option value={'backtracking'}>Backtracking</option>
                        </select>

                        <select onChange={(e)=>{
                            setDifficulty(e.target.value)
                        }}>
                            <option value={'easy'}>Easy</option>
                            <option value={'medium'}>Medium</option>
                            <option value={'difficult'}>Difficult</option>
                        </select>
                    </div>
                    
                    {/* style={{backgroundColor:'blueviolet'}} */}
                    <button className='btn btn-large' onClick={()=>{GetQuestions()}}>Get Questions</button>

                    <br/>
                    <br/>
                    <br/>

                    <div style={{backgroundColor:'whitesmoke',color:'blueviolet',marginLeft:'10%',marginRight:'10%',opacity:'0.8' , boxShadow:'5px 5px 15px black'}}>
                    <table>
                                <thead>
                                    <tr>
                                        <td style={{width:'20%'}}><h4>S.No</h4></td>
                                        <td style={{width:'50%'}}><h4>Question</h4></td>
                                        <td style={{width:'30%'}}><h4>Status</h4></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        questions.map((item,index)=>{
                                            var questionID=item._id
                                            return (
                                                    <tr key={questionID}>
                                                        <td style={{width:'20%'}}><h5>{index+1}</h5></td>
                                                        <td style={{width:'50%'}}><h5><a href={item.url} target='_blank'>{item.questionName}</a></h5></td>
                                                        <td style={{width:'30%'}}>
                                                            {
                                                                alreadySolved.includes(item._id)
                                                                ?
                                                                <h5><span><i className='material-icons'>done</i>Already Done <button onClick={()=>{
                                                                    Undone(questionID)
                                                                }}>Undone</button> </span></h5>
                                                                :
                                                                <button onClick={()=>{
                                                                    MarkAsDone(questionID)
                                                                }} ><h5><i className='material-icons medium'>edit</i>Mark as Done</h5> </button>
                                                                
                                                            }
                                                        </td>
                                                    </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                
                            </table>
                    </div>
                    

                </div>
                {/* <div style={{width:'600px'}}>
                    <h3>Here you will have statistics</h3>
                </div> */}
            {/* </div> */}
            
        </div>
    )
}

export default DSA;