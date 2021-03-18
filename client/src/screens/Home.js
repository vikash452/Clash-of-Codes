import { Verify } from 'crypto'
import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import './design.css';
import Notice from '../images/notice.jpg'
import CF from '../images/cf.jpg'

function Home() {


    var [name, setName] = useState('');
    var [upcomingCF, setUpcomingCF] = useState([]);
    var user;
    const history = useHistory();
    useEffect(() => {

        user = JSON.parse(localStorage.getItem('user'))
        // console.log(user)
        if (!user) {
            history.push('/signin')
        }
        else {
            setName(user.name)
        }

        fetch('https://codeforces.com/api/contest.list')
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            var temp=[]
            data.result.forEach(element => {
                if(element.relativeTimeSeconds < 0)
                {
                    temp.push(element)
                }
                
            });
            temp.reverse()
            temp.splice(3,temp.length)
            setUpcomingCF(temp)
        })

    }, [])
    // console.log(process.env)
    return (
        <div style={{
            marginTop: '100px',
            display: 'inline-block',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom:'70px'
        }}>
            <span style={{fontSize:'xxx-large'}}>Hi {name}</span>

            <div style={{backgroundImage:`linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.9)),url()`, maxWidth:'50%', float:'right',color:'black', opacity:'0.7', boxShadow:'10px 10px 5px 5px black'}}>
                {
                    upcomingCF.map(item=>{
                        // console.log(item.startTimeSeconds)
                        var startDate=new Date(item.startTimeSeconds*1000).toLocaleDateString()
                        // var startDate=d.getDate() + ' ' + d.getMonth()+1 + ' ' + d.getFullYear()
                        var startTime=new Date(item.startTimeSeconds*1000).toLocaleTimeString()
                        return(
                            <h4 key={item.id}>
                                {item.name} {startDate} {startTime}
                            </h4>
                        )
                    })
                }
            </div>

            
                
        </div>
    )
}

export default Home;