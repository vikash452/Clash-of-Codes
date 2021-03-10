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
        <div style={{ position: 'relative', top: '20%', margin: '0px', padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div class="container" style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '1200px',
                flexwrap: 'wrap',
                zindex: '1'
            }}>
                <div class="card" style={{
                    position: 'relative',
                    width: '650px',
                    height: '600px',
                    margin: '30px',
                    boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.664)',
                    borderRadius: '15px',
                    background: 'rgba(230, 236, 233, 0.50)',
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
                    <div class="content" style={{
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
                            <button className='btn-large' onClick={() => { Login() }}
                                style={{
                                    backgroundColor: '#42f067',
                                    fontSize: '1.2rem',
                                    overflow: 'hidden',
                                    fontFamily: '"Nova Round", cursive',
                                    fontWeight: 'bold'
                                }}>
                                Sign In
                            </button>
                            <span>
                                <Link to='/forgotPassword'>
                                    <button className='waves-effect waves-light btn-large'
                                        style={{
                                            backgroundColor: '#42f067',
                                            fontSize: '1.2rem',
                                            overflow: 'hidden',
                                            fontFamily: '"Nova Round", cursive',
                                            fontWeight: 'bold',
                                        }}>
                                        Forgot your password?
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
                                color: '#1f13ec',
                                fontFamily: '"Nova Round", cursive',
                                fontWeight: 'bold',
                                fontSize: '1.8rem'
                            }}>Don't have an account?</h5>
                            <span>
                                <Link to='/signup'>
                                    <button className='waves-effect waves-light btn-large'
                                        style={{
                                            backgroundColor: '#42f067',
                                            fontSize: '1.2rem',
                                            overflow: 'hidden',
                                            fontFamily: '"Nova Round", cursive',
                                            fontWeight: 'bold'
                                        }}>
                                        SignUp
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