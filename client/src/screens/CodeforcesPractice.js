import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BlobbyButton from './BlobbyButton'
import UniqueSubmissions from './user_uniq_subms_cf'
import './design.css';
import M from 'materialize-css'

function CodeforcesPractice()
{
    const history=useHistory()
    var [initialRating, setInitialRating] = useState(800);
    var [availableTopics , setAvailableTopics]=useState([]);
    var [selectedTopics , setSelectedTopics]=useState([]);
    var [handle,setHandle]=useState('')
    var [questions,setQuestions]=useState([])
    var [increasing,setIncreasing]=useState(false)

    useEffect(()=>{
        var temp=['greedy',
        'dp',
        'dfs',
        'brute force',
        'implementation', 
        'remainder theorem', 
        'constructive algorithms',
        '2-sat',
        'binary search',
        'bitmasks',
    ]
        setAvailableTopics(temp)
        var user=JSON.parse(localStorage.getItem('user'))
        if(user.codeforces === null || user.codeforces === null)
        {
            history.push('/profile')
        }
        else
        {
            setHandle(user.codeforces)
        }
        
    },[])

    function Change1(topicName)
    {
        // console.log(topicName)
        var temp1=[]
        // console.log(typeof(temp1))
        for(var i=0; i<selectedTopics.length; ++i)
        temp1.push(selectedTopics[i]);

        // console.log(temp1)
        temp1.push(topicName);
        // console.log(temp1)
        setSelectedTopics(temp1)
        var index;
        var temp2=[];

        for(var i=0; i<availableTopics.length; ++i)
        temp2.push(availableTopics[i]);

        for(var i=0; i<availableTopics.length; ++i)
        {
            if(availableTopics[i] == topicName)
            {
                index=i;
            }
        }
        // console.log(temp2)
        temp2.splice(index,1);
        // console.log(temp2)
        setAvailableTopics(temp2)
    }

    function Change2(topicName)
    {
        // console.log(topicName)
        var temp1=[]
        // console.log(typeof(temp1))
        for(var i=0; i<availableTopics.length; ++i)
        temp1.push(availableTopics[i]);

        // console.log(temp1)
        temp1.push(topicName);
        // console.log(temp1)
        setAvailableTopics(temp1)
        var index;
        var temp2=[];

        for(var i=0; i<selectedTopics.length; ++i)
        temp2.push(selectedTopics[i]);

        for(var i=0; i<selectedTopics.length; ++i)
        {
            if(selectedTopics[i] == topicName)
            {
                index=i;
            }
        }
        // console.log(temp2)
        temp2.splice(index,1);
        // console.log(temp2)
        setSelectedTopics(temp2)
    }

    function URLmaker()
    {
        var url='https://codeforces.com/api/problemset.problems'
        if(selectedTopics.length == 0)
            return url;

        url += '?tags='
        selectedTopics.forEach((top)=>{
            url+=(top+';')
        })
        // console.log(url)
        return url;

    }

    async function getQuestions_custom()
    {
        var t=await UniqueSubmissions(handle)
        // console.log(t)
        var rating_wise_map=new Map();
        var questions=[];
        var url=URLmaker();
        fetch(url)
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            data.result.problems.forEach((ques)=>{
                var unique=ques.contestId.toString() + ques.index;
                if(!t.has(unique))
                {
                    var quesRating=ques.rating;
                    if(rating_wise_map.has(quesRating))
                    {
                        var newArr=rating_wise_map.get(quesRating)
                        newArr.push(ques)
                        rating_wise_map.set(quesRating,newArr)
                    }
                    else
                    {
                        var newArr=new Array()
                        newArr.push(ques)
                        rating_wise_map.set(quesRating,newArr)
                    }
                }
            })
            // console.log(rating_wise_map)
            // console.log(typeof(parseInt(initialRating)))
            // console.log(rating_wise_map.has(initialRating))
            var rat=(parseInt(initialRating))
            rating_wise_map.forEach((value,key)=>{
                console.log(typeof(key))
            })

            var temp_questions=[];
            for(var i=0; i<6; ++i)
            {
                temp_questions.push(rating_wise_map.get(rat)[i])
            }
            console.log(temp_questions)
            setQuestions(temp_questions)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // useEffect(()=>{
    //     // console.log(availableTopics)
    //     // console.log(selectedTopics)
    // },[availableTopics,selectedTopics])
    return (
        <div style={{display:'flex', flexDirection:'row', marginTop:'100px'}}>

            <div style={{borderRight:'5px solid white', width:'70vw'}}>
                <div>
                    {
                        questions.map((ques)=>{
                            return (
                                <a 
                                key={ques.contestId + ques.index} 
                                href={`https://codeforces.com/contest/${ques.contestId}/problem/${ques.index}`} 
                                target='_blank'
                                >
                                    <div className='card-text' style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:'20px'}}>
                                        <div>
                                            {ques.name}
                                        </div>
                                        <div style={{fontSize:'15px'}}>
                                            Rating : {ques.rating}
                                        </div>
                                        <div>
                                        {
                                        ques.tags.map((tag)=>{
                                            return (
                                                <h6 key={ques.contestId + ques.index + tag}>
                                                    {tag}, 
                                                </h6>
                                            )
                                            })
                                        }
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>
            </div>

            <div style={{marginTop:'', display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center'}}>
                
                <div>
                    <button>
                        Get daily mix   
                    </button>
                </div>

                <div style={{maxWidth:'fit-content', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <h6>
                        Select rating of questions
                        <select 
                        className='browser-default' 
                        onChange={(e)=>{setInitialRating(e.target.value)}}
                        style={{maxWidth:'fit-content', margin:'auto', marginTop:'10px'}}
                        >
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
                    </h6>
                    
                    <label>
                        <input type='checkbox' checked={!increasing} 
                        onChange={()=>{
                            setIncreasing(!increasing)
                        }}
                        />
                        <span style={{fontSize:'20px', color:'white'}}>increasing</span>
                    </label>

                    <div style={{marginTop:'20px', marginBottom:'20px'}}>
                    <button className='blobby-button' onClick={()=>{getQuestions_custom()}}>
                    Get Questions
                    <BlobbyButton/>
                    </button>
                </div>
                </div>
                
                {/* FOR TOPIC WISE */}
                
                
                <div style={{width:'370px', border:'7px solid black', maxHeight:'250px', overflowY:'scroll'}}>
                        <h4>Available topics</h4>
                        {
                            availableTopics.map((top)=>{
                            return (
                                    <div key={top} className='chip' style={{cursor:'pointer'}}>
                                        <span style={{fontSize:'17px'}} onClick={()=>{
                                        console.log(top)
                                        Change1(top)
                                        }}>
                                        {top}
                                        </span>
                                    </div>
                                )
                            })
                        }
                        
                    </div>

                <div style={{width:'370px', border:'7px solid black', maxHeight:'250px', overflowY:'scroll'}}>
                    <h4>Selected topics</h4>
                        {
                            selectedTopics.map((top)=>{
                                // console.log(top) 
                                // console.log(availableTopics.length)
                            return (
                                    <div key={top} className='chip' style={{cursor:'pointer'}} >
                                        <span style={{fontSize:'17px' }} onClick={()=>{
                                        console.log(top)
                                        Change2(top)
                                        }}>
                                        {top}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                  
            </div>
            
            
            {/* 
            <div>
                <div className='row' style={{justifyContent:'center'}}>
                    {

                        questions.map(ques => {
                            return (
                                <div className='card' key={ques.name}>
                                    <a className='col s4 m4' href={`https://codeforces.com/contest/${ques.contestId}/problem/${ques.index}`}
                                        target='_blank'
                                    >   
                                        <div className='practiceCard'>
                                            <span className='card-text'>{ques.name}
                                            <br/>
                                            {
                                                ques.tags.map((tag)=>{
                                                    return <span style={{fontSize:'15px', fontWeight:'lighter'}} key={ques.name+tag}>{tag}, </span>
                                                })
                                            }
                                            </span>
                                        </div>
                                        
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            */}
        </div>
    )
}

export default CodeforcesPractice;