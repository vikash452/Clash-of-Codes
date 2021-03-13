import { Verify } from 'crypto'
import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import './design.css';
function Home() {
    function Logout() {
        fetch('/user/logout', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                localStorage.clear()
                history.push('/signin')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    var [name, setName] = useState('');
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
    }, [])
    // console.log(process.env)
    return (
        <div style={{
            marginTop: '100px',
            display: 'inline-block',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h1>Hi {name}</h1>
            <h2>....Hope you are coding well....</h2>
            <div style={{ 
                marginTop: '7rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <button className="blobby-button" onClick={() => { Logout() }}
                    style={{
                        position: 'absolute',
                        fontSize: '1.3rem',
                    }}>Logout<span className="inner">
                        <span className="blobs">
                            <span className="blob"></span>
                            <span className="blob"></span>
                            <span className="blob"></span>
                            <span className="blob"></span>
                        </span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                    result="goo"></feColorMatrix>
                                <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                            </filter>
                        </defs>
                    </svg>
                </button>
            </div>

        </div>
    )
}

export default Home;