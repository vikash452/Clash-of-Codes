import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import './design.css'
import img from '../images/clash_of_codes.jpg'
function Signin() {
    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')
    const history = useHistory();
    var user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if (user) {
            history.push('/home')
        }
    }, []);

    function Login() {
        fetch('/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({
                        html: 'Invalid email id or password',
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                }
                else {
                    M.toast({
                        html: 'Successfully signed in',
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                    localStorage.setItem('jwt', data.token)
                    localStorage.setItem('user', JSON.stringify(data.foundUser))
                    history.push('/home')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="container" style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '1200px',
                flexwrap: 'wrap',
                zindex: '1'
            }}>
                <div className="card" style={{
                    position: 'relative',
                    width: '600px',
                    //minWidth: '420px',
                    height: '600px',
                    margin: '30px',
                    boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.667)',
                    borderRadius: '15px',
                    background: 'rgba(230, 236, 233, 0.35)',
                    overflow: 'hidden',
                    display: 'box',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(5px)'
                }}>
                    <img src="https://codelearn.com/wp-content/uploads/sites/5/2021/01/clash_of_codes.jpg" style={{
                        width: '100%',
                        height: '35%'
                    }}></img>
                    <div className="content" style={{
                        position: 'relative',
                        padding: '20px',
                        textAlign: 'center',
                        transition: '0.5s'
                    }}>



                        <input type='text' placeholder='email' style={{
                            maxWidth: '300px',
                            marginTop: '2%',
                            color: 'white !important',
                            borderBottom: '2px solid'
                        }}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <br />
                        <input type='text' placeholder='password' style={{
                            maxWidth: '300px',
                            color: 'white !important',
                            borderBottom: '2px solid'
                        }}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2rem'
                        }}>

                            <button className="blobby-button" onClick={() => { Login() }} style={{fontSize: '1.2rem'}}>Sign In <span className="inner">
                                <span className="blobs">
                                    <span className="blob"></span>
                                    <span className="blob"></span>
                                    <span className="blob"></span>

                                    <span
                                        className="blob"></span>
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
                            <span>
                                <Link to='/forgotPassword'>
                                    <button className="blobby-button" style={{
                                        marginLeft: '2rem',
                                        fontSize: '1.2rem'
                                    }}>Forgot Password <span className="inner">
                                            <span className="blobs">
                                                <span className="blob"></span>
                                                <span className="blob"></span>
                                                <span className="blob"></span>

                                                <span
                                                    className="blob"></span>
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
                                </Link>
                            </span>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2rem'
                        }}>
                            <h5 style={{
                                color: '#e6ff02',
                                fontFamily: '"Nova Round", cursive',
                                fontWeight: 'bold',
                                fontSize: '1.8rem'
                            }}>Don't have an account?</h5>
                            <span>
                                <Link to='/signup'>
                                    <button className="blobby-button" style={{
                                        marginLeft: '0.5rem',
                                        fontSize: '1.2rem'
                                    }}>Sign Up <span className="inner">
                                        <span className="blobs">
                                            <span className="blob"></span>
                                            <span className="blob"></span>
                                            <span className="blob"></span>

                                            <span
                                                className="blob"></span>
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
                                </Link>
                            </span>
                        </div>

                    </div>

                </div>

            </div>

        </div >
    )
}

export default Signin;