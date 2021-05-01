import {useState,useEffect} from 'react'
import BlobbyButton from './BlobbyButton'
import M from 'materialize-css'
import UniqueSubmissions,{AllSubmissions} from './user_uniq_subms_cf'

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
    var [unsolved,setUnsolved]=useState(false)
    var [handle,setHandle]=useState(null)

    useEffect(()=>{
        var tooltip_elem=document.querySelectorAll('.tooltipped')
        M.Tooltip.init(tooltip_elem)
        var user=JSON.parse(localStorage.getItem('user'))
        setHandle(user.codeforces)
    },[])

    async function GetAllContests()
    {
        try{

        
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
            if(handle===null || handle.length==0)
            {
                M.toast({
                    html: 'Enter handle',
                    classes: "#ce93d8 purple",
                    displayLength: 4000,
                })
            }
            var user_all_submissions=await AllSubmissions(handle)
            var user_attempted_contests=new Set()
            user_all_submissions.forEach((value,key)=>{
                user_attempted_contests.add(value.contestId)
            })
            console.log(user_attempted_contests)

            for(var i=0; i<display_temp.length; ++i)
            {
                if(user_attempted_contests.has(display_temp[i].id))
                {
                    console.log('found=',display_temp[i].id)
                    display_temp.splice(i,1);
                    --i;
                }
            }
            setDisplay(display_temp)
        }

        if(unsolved)
        {
            if(handle===null || handle.length==0)
            {
                M.toast({
                    html: 'Enter handle',
                    classes: "#ce93d8 purple",
                    displayLength: 2000,
                })
                return 
            }

            var user_accepted_submissions=await UniqueSubmissions(handle)
            var user_attempted_contests=new Set()

            user_accepted_submissions.forEach((value,key)=>{
                user_attempted_contests.add(value.contestId)
            })

            for(var i=0; i<display_temp.length; ++i)
            {
                if(user_attempted_contests.has(display_temp[i].id))
                {
                    display_temp.splice(i,1);
                    --i;
                }
            }
            setDisplay(display_temp)
        }

        M.toast({
            html: 'Success!!',
            classes: "#ce93d8 purple",
            displayLength: 4000,
        })
        setDisplay(display_temp)
        }catch{
            M.toast({
                html: 'Check your handle or try again after some time',
                classes: "#ce93d8 purple",
                displayLength: 4000,
            })
        }
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
                        data-tooltip="
                        If selected, then only those contests will be displayed whose questions
                        you have never <b><span style={{fontSize:'23px'}}>attempted</span></b> before. This will help you in giving virtual
                        contests with a completely new set of questions
                        "
                        style={{fontSize:'20px', marginLeft:'20px'}}
                        >
                            help_outline
                        </i>
                    </span>
                </label>

                <label style={{marginLeft:'50px'}}>
                    <input type='checkbox' checked={unsolved} 
                    onChange={()=>{
                        setUnsolved(!unsolved)
                    }}
                    />
                    <span style={{fontSize:'20px', color:'white'}}>
                        Unsolved 
                        <i className='material-icons small tooltipped'
                        data-position='top'
                        data-tooltip="
                        If selected, then only those contests will be displayed in which
                        you have never made any <b><span style={{fontSize:'23px'}}>successful</span></b> submissions.
                        "
                        style={{fontSize:'20px', marginLeft:'20px'}}
                        >
                            help_outline
                        </i>
                    </span>
                </label>

            </div>

            <div style={{marginTop:'5rem'}}>
                <button className='blobby-button' 
                onClick={()=>{
                    if(contestType==='notselected')
                    {
                        M.toast({
                            html: 'Select a contest!!',
                            classes: "#ce93d8 purple",
                            displayLength: 4000,
                        })
                    }
                    else
                    GetAllContests()
                }} 
                    style={{fontSize:'1.2rem'}}>
                    Get Contests
                    <BlobbyButton/>
                </button>
            </div>

            <div style={{marginTop:'5rem'}}>
                <div className='custom_row_of_table'>
                    <div style={{fontWeight: 'bold', width: '100%', display:'flex', flexDirection:'row', background:'rgba(64, 64, 64, 0.6)'}}>
                        <div className='cell_left' style={{color: '#e6ff02', width: '60%'}}>
                            Contest
                        </div>
                        <div className='cell_left' style={{color: '#e6ff02', width: '20%'}}>
                            Date
                        </div>
                        <div className='cell_right' style={{color: '#e6ff02', width: '20%'}}>
                            Participate
                        </div>
                    </div>
                    

                    {
                        toDisplay.map((cont)=>{
                            var d=new Date(cont.startTimeSeconds*1000).toDateString()
                            return (
                                <div key={cont.id} style={{width: '100%',display:'flex', flexDirection:'row', background:'rgba(64, 64, 64, 0.6)'}}>

                                    <div className='cell_left' style={{width: '60%'}}>
                                        <a style={{color:'white'}} href={`https://codeforces.com/contest/${cont.id}`} target='_blank'>
                                            {cont.name}
                                        </a>
                                        
                                    </div>

                                    <div className='cell_left'style={{width: '20%'}}>
                                        {d}
                                    </div>

                                    <div className='cell_right'style={{width: '20%'}}>
                                        <a 
                                        style={{color:'white'}}
                                        href={`https://codeforces.com/contestRegistration/${cont.id}/virtual/true`}
                                        target='_blank'
                                        >
                                            Virtual Participation
                                        </a>
                                    </div>
                                         
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Division;