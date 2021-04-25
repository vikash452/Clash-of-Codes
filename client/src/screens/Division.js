import {useState,useEffect} from 'react'
import BlobbyButton from './BlobbyButton'
import M from 'materialize-css'
import user_uniq_subms_cf from './user_uniq_subms_cf'

function Division()
{

    var [div1,setDiv1]=useState([])
    var [div2,setDiv2]=useState([])
    var [div3,setDiv3]=useState([])
    var [div4,setDiv4]=useState([])
    var [edRound,setEdRound]=useState([])
    var [globalRound,setGlobalRound]=useState([])
    var [toDisplay,setDisplay]=useState([])
    var [contestType,setContestType]=useState('notselected')
    var [unattempted,setUnattempted]=useState(false)
    var [handle,setHandle]=useState(null)

    useEffect(()=>{
        var tooltip_elem=document.querySelectorAll('.tooltipped')
        M.Tooltip.init(tooltip_elem)
        var user=JSON.parse(localStorage.getItem('user'))
        setHandle(user.codeforces)
    },[])

    async function GetAllContests()
    {
        var allContestPromise=await fetch('https://codeforces.com/api/contest.list')
        var allContests=await allContestPromise.json()
        var div1_temp=[]
        var div2_temp=[]
        var div3_temp=[]
        var div4_temp=[]
        var ed_temp=[]
        var global_temp=[]

        allContests.result.forEach(cont => {
            if(cont.relativeTimeSeconds < 0)
            return;

            if(cont.name.search('Global') != -1)
            global_temp.push(cont)
            else if(cont.name.search('Educational') !=-1 )
            ed_temp.push(cont)
            else if(cont.name.search('Div. 1') !=-1 )
            div1_temp.push(cont)
            else if(cont.name.search('Div. 2') !=-1 )
            div2_temp.push(cont)
            else if(cont.name.search('Div. 3') !=-1 )
            div3_temp.push(cont)
            else if(cont.name.search('Div. 4') !=-1 )
            div4_temp.push(cont)

        });

        // console.log(div1_temp);
        // console.log(div2_temp);
        // console.log(div3_temp);
        // console.log(div4_temp);
        // console.log(ed_temp);
        // console.log(global_temp);
        var display_temp=[]
        console.log(contestType)
        if(contestType === 'div1')
        display_temp=[...div1_temp]
        // setDisplay(div1_temp)
        if(contestType === 'div2')
        display_temp=[...div2_temp]
        // setDisplay(div2_temp)
        if(contestType === 'div3')
        display_temp=[...div3_temp]
        // setDisplay(div3_temp)
        if(contestType === 'div4')
        display_temp=[...div4_temp]
        // setDisplay(div4_temp)
        if(contestType === 'global')
        display_temp=[...global_temp]
        // setDisplay(global_temp)
        if(contestType === 'ed')
        display_temp=[...ed_temp]
        // setDisplay(ed_temp)
        console.log(display_temp)
        console.log('un=',unattempted)
        if(unattempted)
        {
            console.log(handle)
            var user_accepted_submissions=await user_uniq_subms_cf(handle)
            var user_attempted_contests=new Set()

            user_accepted_submissions.forEach((value,key)=>{
                user_attempted_contests.add(value.contestId)
            })
            console.log(user_attempted_contests)
            var temp2=[]
            display_temp.forEach((item,index)=>{
                console.log(item.id)
                if(!user_attempted_contests.has(item.id))
                {
                    
                    temp2.push(item)
                    // console.log(index)
                    // display_temp.splice(index,1);
                }
            })

            setDisplay(temp2)

        }
        setDisplay(display_temp)
    }

    return (
        <div style={{marginTop:'100px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <div>
                <h3 style={{fontWeight: '1.2rem'}}>Select a contest type</h3>
                <span className='chip' style={{cursor:'pointer', backgroundColor:contestType==='div1'?'lightgreen':'#e4e4e4', textAlign:'center'}} onClick={()=>{setContestType('div1')}}>Division 1</span>
                <span className='chip' style={{cursor:'pointer', backgroundColor:contestType==='div2'?'lightgreen':'#e4e4e4', textAlign:'center'}} onClick={()=>{setContestType('div2')}}>Division 2</span>
                <span className='chip' style={{cursor:'pointer', backgroundColor:contestType==='div3'?'lightgreen':'#e4e4e4', textAlign:'center'}} onClick={()=>{setContestType('div3')}}>Division 3</span>
                <span className='chip' style={{cursor:'pointer', backgroundColor:contestType==='div4'?'lightgreen':'#e4e4e4', textAlign:'center'}} onClick={()=>{setContestType('div4')}}>Division 4</span>
                <span className='chip' style={{cursor:'pointer', backgroundColor:contestType==='ed'?'lightgreen':'#e4e4e4', textAlign:'center'}} onClick={()=>{setContestType('ed')}}>Educational Round</span>
                <span className='chip' style={{cursor:'pointer', backgroundColor:contestType==='global'?'lightgreen':'#e4e4e4', textAlign:'center'}} onClick={()=>{setContestType('global')}}>Global Round</span>
            </div>

            <div style={{marginTop:'5rem'}}>
                <label>
                    <input type='checkbox' checked={unattempted} 
                    onChange={()=>{
                        setUnattempted(!unattempted)
                    }}
                    />
                    <span style={{fontSize:'20px', color:'white'}}>
                        Unattempted 
                        <i className='material-icons small tooltipped'
                        data-position='top'
                        data-tooltip="When selected the questions will be in increasing order. Suppose 
                        if 1st question is selected to be of 1000 rating then 2nd will be of 1100,
                        3rd will be of 1100 and so on
                        "
                        style={{fontSize:'20px', marginLeft:'20px'}}
                        >
                            help_outline
                        </i>
                    </span>
                </label>
            </div>

            <div style={{marginTop:'5rem'}}>
                <button className='blobby-button' onClick={()=>{GetAllContests()}} style={{fontSize:'1.2rem'}}>
                    Get Contests
                    <BlobbyButton/>
                </button>
            </div>

            <div style={{marginTop:'5rem'}}>
                <div className='custom_row_of_table'>
                    <div style={{fontWeight: 'bold', width: '100%', display:'flex', flexDirection:'row', background:'rgba(230, 236, 233, 0.349)'}}>
                        <div className='cell_left' style={{color: '#e6ff02', width: '70%'}}>
                            Contest
                        </div>
                        <div className='cell_right' style={{color: '#e6ff02', width: '30%'}}>
                            Date
                        </div>
                    </div>
                    

                    {
                        toDisplay.map((cont)=>{
                            var d=new Date(cont.startTimeSeconds*1000).toDateString()
                            return (
                                <div key={cont.id} style={{width: '100%',display:'flex', flexDirection:'row'}}>

                                    <div className='cell_left' style={{width: '70%'}}>
                                        <a style={{color:'white'}} href={`https://codeforces.com/contest/${cont.id}`} target='_blank'>
                                            {cont.name}
                                        </a>
                                        
                                    </div>

                                    <div className='cell_right'style={{width: '30%'}}>
                                        {d}
                                    </div>
                                         
                                </div>
                            )
                        })
                    }

                </div>
                {/* 
                <table className='centered'>
                    <thead>
                        <tr>
                            <th style={{marginRight:'20px'}}>
                                Contest
                            </th>
                            <th style={{marginLeft:'20px'}}>
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        toDisplay.map((cont)=>{
                            var d=new Date(cont.startTimeSeconds*1000).toLocaleDateString()
                            return (
                                <tr key={cont.id}>
                                    <td style={{marginRight:'20px'}}>
                                        {cont.name}
                                    </td>
                                    <td style={{marginLeft:'20px'}}>
                                        {d}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                */}
                </div>

            

        </div>
    )
}

export default Division;