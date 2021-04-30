import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import './design.css'
import img from '../images/clash_of_codes.jpg'
import fetch from 'node-fetch'
import BlobbyButton from './BlobbyButton'
import GoogleLogo from '../images/google logo.png'
import LandingPage from '../images/landingPage.png'
import Navbar_Logo from '../images/logo.jpg'

function Signin() {
    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')
    const history = useHistory();
    var user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if (user) {
            history.push('/home')
        }

        console.log(window.innerWidth)
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
            <div className="sign-in-container" style={{
                // position: 'relative',
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // maxWidth: '1200px',
                // flexwrap: 'wrap',
                // zindex: '1'
            }}>
                <div className="card" style={{
                    // position: 'relative',
                    // width: '600px',
                    // //minWidth: '420px',
                    // // height: '630px',
                    // height: 'fit-content',
                    // margin: '30px',
                    // boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.667)',
                    // borderRadius: '15px',
                    // background: 'rgba(230, 236, 233, 0.35)',
                    // overflow: 'hidden',
                    // display: 'box',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                    // backdropFilter: 'blur(5px)'
                }}>
                    <img src="https://codelearn.com/wp-content/uploads/sites/5/2021/01/clash_of_codes.jpg" style={{
                        // width: '100%',
                        // height: '35%'
                    }}></img>
                    <div className="content" style={{
                        // position: 'relative',
                        // padding: '20px',
                        // textAlign: 'center',
                        // transition: '0.5s'
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
                        <input type='password' placeholder='password' style={{
                            maxWidth: '300px',
                            color: 'white !important',
                            borderBottom: '2px solid'
                        }}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <div className='signin_forgot_button_parent' style={{
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // marginTop: '2rem'
                        }}>

                            <button className="blobby-button" onClick={() => { Login() }} 
                            style={{
                                // fontSize: '1.2rem', marginBottom:'10px'
                                }}>
                                Sign In 
                                <BlobbyButton/>
                            </button>
                            
                            {/* <div>
                                <a href='http://localhost:5000/auth/google'>
                                    <img src={GoogleLogo} style={{width:'50px', height:'50px'}}></img>
                                </a>
                            </div> */}
                            
                            {/* <a href='http://localhost:5000/auth/google'>Google</a> */}

                            <Link to='/forgotPassword'>
                                <button className="blobby-button" style={{
                                    // marginLeft: '2rem',
                                    // fontSize: '1.2rem'
                                }}>
                                    Forgot Password 
                                    <BlobbyButton/>
                                </button>
                            </Link>
                        </div>

                        <div className="Google-login" 
                        style={{
                            // display:'flex', marginTop:'2rem', justifyContent:'center'
                            }}>
                            <span style={{
                                // color: '#e6ff02',
                                // fontFamily: '"Nova Round", cursive',
                                // fontWeight: 'bold',
                                // fontSize: '1.9rem'
                            }}>
                                Or connect with us through 
                            </span>
                                <a href='http://clashofcodes.herokuapp.com/auth/google' style={{marginBottom:'auto', marginTop:'auto'}}>
                                    <img src={GoogleLogo} style={{width:'45px', height:'45px', marginLeft:'1rem'}}></img>
                                </a>
                            
                        </div>

                        <div className="new-user" style={{
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // marginTop: '2rem'
                        }}>
                            <h5 style={{
                                // color: '#e6ff02',
                                // fontFamily: '"Nova Round", cursive',
                                // fontWeight: 'bold',
                                // fontSize: '1.8rem'
                            }}>
                                Don't have an account?
                            </h5>
                            <span>
                                <Link to='/signup'>
                                    <button className="blobby-button" style={{
                                        // marginLeft: '0.5rem',
                                        // fontSize: '1.2rem'
                                    }}>Sign Up 
                                    <BlobbyButton/>
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