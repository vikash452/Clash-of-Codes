import {useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function DSA()
{

    
    const [topic,setTopic]=useState('greedy');

    useEffect(()=>{
        var elems=document.querySelector('select');
        var instances = M.FormSelect.init(elems);
    },[])

    return (
        <div>
            <h2>You will be able to practice DSA questions here</h2>
            <div style={{display:'flex' , justifyContent:'space-evenly'}}>
                <div style={{width:'600px'}}>
                    <h3>Here you can practice questions based on the topic</h3>

                    <select  onChange={(e)=>{
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

                </div>
                <div style={{width:'600px'}}>
                    <h3>Here you will have statistics</h3>
                </div>
            </div>
            
        </div>
    )
}

export default DSA;