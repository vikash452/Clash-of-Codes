import {useState,useEffect} from 'react'
import BlobbyButton from './BlobbyButton'

function Division()
{

    var [div1,setDiv1]=useState([])
    var [div2,setDiv2]=useState([])
    var [div3,setDiv3]=useState([])
    var [edRound,setEdRound]=useState([])
    var [globalRound,setGlobalRound]=useState([])
    var [toDisplay,setDisplay]=useState([])
    var [contestType,setContestType]=useState('notselected')

    useEffect(()=>{
        // GetAllContests()
    },[])

    async function GetAllContests()
    {
        var allContestPromise=await fetch('https://codeforces.com/api/contest.list')
        var allContests=await allContestPromise.json()
        var div1_temp=[]
        var div2_temp=[]
        var div3_temp=[]
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

        });

        console.log(div1_temp);
        console.log(div2_temp);
        console.log(div3_temp);
        console.log(ed_temp);
        console.log(global_temp);

        console.log(contestType)
        if(contestType === 'div1')
        setDisplay(div1_temp)
        if(contestType === 'div2')
        setDisplay(div2_temp)
        if(contestType === 'div3')
        setDisplay(div3_temp)
        if(contestType === 'global')
        setDisplay(global_temp)
        if(contestType === 'ed')
        setDisplay(ed_temp)
    }

    return (
        <div style={{marginTop:'100px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <div>
                <h3>Select a contest type</h3>
                <span className='chip' style={{cursor:'pointer'}} onClick={()=>{setContestType('div1')}}>Division 1</span>
                <span className='chip' style={{cursor:'pointer'}} onClick={()=>{setContestType('div2')}}>Division 2</span>
                <span className='chip' style={{cursor:'pointer'}} onClick={()=>{setContestType('div3')}}>Division 3</span>
                <span className='chip' style={{cursor:'pointer'}} onClick={()=>{setContestType('ed')}}>Educational Round</span>
                <span className='chip' style={{cursor:'pointer'}} onClick={()=>{setContestType('global')}}>Global Round</span>
            </div>

            <div style={{marginTop:'20px'}}>
                <button className='blobby-button' onClick={()=>{GetAllContests()}}>
                    Get Contests
                    <BlobbyButton/>
                </button>
            </div>

            <div style={{marginTop:'50px'}}>
                <table>
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
            </div>

            

        </div>
    )
}

export default Division;