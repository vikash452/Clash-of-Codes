import { useEffect, useState } from "react";
import BlobbyButton from './BlobbyButton'

function CodeforcesPractice()
{
    var [initialRating, setInitialRating] = useState(800);
    var [availableTopics , setAvailableTopics]=useState([]);
    var [selectedTopics , setSelectedTopics]=useState([]);

    useEffect(()=>{
        var temp=['greedy','dp','dfs','brute force','implementation', 'remainder theorem', 'constructive algorithms']
        setAvailableTopics(temp)
    },[])

    function Change1(topicName)
    {
        console.log(topicName)
        var temp1=[]
        // console.log(typeof(temp1))
        for(var i=0; i<selectedTopics.length; ++i)
        temp1.push(selectedTopics[i]);

        console.log(temp1)
        temp1.push(topicName);
        console.log(temp1)
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
        console.log(temp2)
        temp2.splice(index,1);
        console.log(temp2)
        setAvailableTopics(temp2)
    }

    function Change2(topicName)
    {
        console.log(topicName)
        var temp1=[]
        // console.log(typeof(temp1))
        for(var i=0; i<availableTopics.length; ++i)
        temp1.push(availableTopics[i]);

        console.log(temp1)
        temp1.push(topicName);
        console.log(temp1)
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
        console.log(temp2)
        temp2.splice(index,1);
        console.log(temp2)
        setSelectedTopics(temp2)
    }

    useEffect(()=>{
        console.log(availableTopics)
        console.log(selectedTopics)
    },[availableTopics,selectedTopics])
    return (
        <div style={{marginTop:'100px', display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
            <div style={{maxWidth:'fit-content'}}>
                <h6>
                    Select initial rating of questions
                    <select 
                    className='browser-default' 
                    onChange={(e)=>{setInitialRating(e.target.value)}}
                    style={{maxWidth:'fit-content'}}
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
            </div>
            
            {/* FOR TOPIC WISE */}
            {/* <div> */}
            
                <div style={{width:'400px'}}>
                    <h4>Available topics</h4>
                    {
                        availableTopics.map((top)=>{
                            // console.log(top) 
                            // console.log(availableTopics.length)
                        return (
                                <div key={top} className='chip' 
                                >
                                    <span style={{fontSize:'17px', cursor:'pointer'}} onClick={()=>{
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

                <div style={{width:'400px'}}>
                <h4>Selected topics</h4>
                    {
                        selectedTopics.map((top)=>{
                            // console.log(top) 
                            // console.log(availableTopics.length)
                        return (
                                <div key={top} className='chip' 
                                >
                                    <span style={{fontSize:'17px' , cursor:'pointer'}} onClick={()=>{
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
            
            <div>
                <button className='blobby-button'>
                Get Questions
                <BlobbyButton/>
                </button>
            </div>
            
            {/* </div> */}
        </div>
    )
}

export default CodeforcesPractice;