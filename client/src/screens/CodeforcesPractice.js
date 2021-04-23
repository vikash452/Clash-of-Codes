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
    var [pre, setPre]=useState(false)

    useEffect(()=>{
        var temp=['greedy',
        'dp',
        'dfs and similar',
        'brute force',
        'implementation', 
        'remainder theorem', 
        'constructive algorithms',
        '2-sat',
        'binary search',
        'bitmasks',
        'data structures',
        'divide and conquer',
        'geometry',
        'graphs',
        'number theory',
        'probabilities',
        'sortings',
        'strings',
        'ternary search',
        'trees',
        'two pointers'
    ]

        var tooltip_elem=document.querySelectorAll('.tooltipped')
        M.Tooltip.init(tooltip_elem)
        setAvailableTopics(temp)
        var user=JSON.parse(localStorage.getItem('user'))
        if(user.codeforces === null || user.codeforces === null)
        {
            history.push('/profile')
        }
        else
        {
            setHandle(user.codeforces)
            getQuestions_dailyMix(user.codeforces)
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

    function URLmaker(checker)
    {
        var url='https://codeforces.com/api/problemset.problems'
        if(selectedTopics.length == 0)
            return url;

        if(checker == 0)
        return url    

        url += '?tags='
        selectedTopics.forEach((top)=>{
            url+=(top+';')
        })
        // console.log(url)
        return url;

    }

    async function getQuestions_custom()
    {
        setPre(true)
        var t=await UniqueSubmissions(handle)
        // console.log(t)
        var rating_wise_map=new Map();
        var questions=[];
        var url=URLmaker(1);
        console.log(url)
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
            console.log(rating_wise_map)
            // console.log(typeof(parseInt(initialRating)))
            // console.log(rating_wise_map.has(initialRating))
            var rat=(parseInt(initialRating))
            rating_wise_map.forEach((value,key)=>{
                console.log(typeof(key))
            })

            var temp_questions=[];
            for(var i=0; i<8; ++i)
            {
                if(rating_wise_map.has(rat))
                {
                    var qArray=rating_wise_map.get(rat)
                    if(qArray.length > 0 && qArray[i] != undefined && qArray[i]!=null)
                        temp_questions.push(qArray[i])
                }
                // temp_questions.push(rating_wise_map.get(rat)[i])
                if(increasing && rat < 3400)
                rat+=100
            }
            console.log(temp_questions)
            setQuestions(temp_questions)
            setPre(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    async function getQuestions_dailyMix(handle)
    {
        setPre(true)
        var t=await UniqueSubmissions(handle)
        // console.log(t)
        var rating_wise_map=new Map();
        var questions=[];

        var url=URLmaker(0);
        // console.log(url)
        var fetch_var = await fetch(url)
        var data = await fetch_var.json()
        
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

        var fetch_var2 = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
        var user_cf_data = await fetch_var2.json()
        console.log(user_cf_data)
        var rat=(Math.floor(user_cf_data.result[0].rating / 100))*100 - 100;
        rat = Math.max(rat,800)

        console.log(rat)
        var temp_questions=[];
        for(var i=0; i<8; ++i)
        {
            temp_questions.push(rating_wise_map.get(rat)[i])
            if(rat < 3400 && i%2 == 0)
            rat+=100
        }

        setQuestions(temp_questions)
        setPre(false)

    }

    // useEffect(()=>{
    //     // console.log(availableTopics)
    //     // console.log(selectedTopics)
    // },[availableTopics,selectedTopics])
    return (
        <div style={{display:'flex', flexDirection:'row', marginTop:'100px'}}>

            <div style={{borderRight:'5px solid white', width:'70vw'}}>
                
                {
                    pre
                    ?
                    <div style={{marginTop:'100px'}}>
                        <div className="preloader-wrapper big active" style={{marginBottom:''}}>
                            <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                        <h3>...We are cooking something for you...</h3>
                        <h4>...Till then you can sanitize your hands...</h4>
                        <h4>...Let's give &#128520; a compilation error...</h4>
                    </div>
                    :     
                    <div>
                        {
                            questions.map((ques)=>{
                                return (
                                    <a 
                                    key={ques.contestId + ques.index} 
                                    href={`https://codeforces.com/contest/${ques.contestId}/problem/${ques.index}`} 
                                    target='_blank'
                                    >
                                        <div className='card-text' style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', marginTop:'20px'}}>
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
                }
            </div>

            <div style={{marginTop:'', display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center'}}>
                
                <div style={{display:'flex' , flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <button className='blobby-button' onClick={()=>{getQuestions_dailyMix(handle)}}>
                        Get daily mix   
                        <BlobbyButton/>
                    </button>
                    <i 
                    className='material-icons small tooltipped'
                    style={{cursor:'pointer', marginLeft:'10px'}}
                    data-position='top'
                    data-tooltip="
                    This will select the questions around and slightly above your rating
                    "
                    >
                        help_outline
                    </i>
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
                        <input type='checkbox' checked={increasing} 
                        onChange={()=>{
                            setIncreasing(!increasing)
                        }}
                        />
                        <span style={{fontSize:'20px', color:'white'}}>
                            increasing 
                            <i className='material-icons small tooltipped'
                            data-position='top'
                            data-tooltip="When selected the questions will be in increasing order. Suppose 
                            if 1st question is selected to be of 1000 rating then 2nd will be of 1100,
                            3rd will be of 1100 and so on
                            "
                            >
                                help_outline
                            </i>
                        </span>
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
                                    <div key={top} className='chip' style={{cursor:'pointer'}} onClick={()=>{
                                        console.log(top)
                                        Change1(top)
                                        }}>
                                        <span style={{fontSize:'17px'}} >
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
                                    <div key={top} className='chip' style={{cursor:'pointer'}} onClick={()=>{
                                        console.log(top)
                                        Change2(top)
                                        }} >
                                        <span style={{fontSize:'17px' }} >
                                        {top}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                  
            </div>
            
        </div>
    )
}

export default CodeforcesPractice;