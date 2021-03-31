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
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                var temp = []
                data.result.forEach(element => {
                    if (element.relativeTimeSeconds < 0) {
                        temp.push(element)
                    }

                });
                temp.reverse()
                temp.splice(3, temp.length)
                setUpcomingCF(temp)
            })

    }, [])
    // console.log(process.env)
    return (
        <div className="Home-div">
            <div className="msg-div">
                <span className="home-msg">Hi {name},</span>
                <p className="msg-content">Let us help you reach the pinnacle of competitive coding. </p>
            </div>


            <div className="home-contests" style={{}}>
                <h3><ul>Upcoming Contests on Codeforces</ul></h3>
                {
                    
                    
                    upcomingCF.map(item => {
                        // console.log(item.startTimeSeconds)
                        var startDate = new Date(item.startTimeSeconds * 1000).toLocaleDateString()
                        // var startDate=d.getDate() + ' ' + d.getMonth()+1 + ' ' + d.getFullYear()
                        var startTime = new Date(item.startTimeSeconds * 1000).toLocaleTimeString()
                        return (
                            <h4 key={item.id}>
                                {item.name}<br></br> {startDate} {startTime}
                            </h4>
                        )
                    })
                }
            </div>



        </div>
    )
}

export default Home;