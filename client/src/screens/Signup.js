import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function Signup() {
    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')
    var [name, setName] = useState('')
    var [vCode, setVcode] = useState('')
    var [gotCode, setGotCode] = useState(false)
    const history = useHistory();

    function getVerificationCode() {
        fetch('/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                // if(data.error)
                // {
                //     alert(data.error)
                // }
                // else{
                //     alert(data.message)
                // }

                if (data.error) {
                    M.toast({
                        html: data.error,
                        classes: '#ce93d8 purple',
                        displayLength: 2000,
                    })
                }
                else {
                    M.toast({
                        html: data.message,
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })

                    setGotCode(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function verifyCode() {
        fetch('/user/verifyCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                code: vCode,
            })
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                // alert(data)
                // if(data.error)
                // {
                //     alert(data.error)
                // }
                // else
                // {
                //     alert('you are successfully registered')
                // }

                if (data.error) {
                    M.toast({
                        html: data.error,
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                }
                else {
                    M.toast({
                        html: 'you are successfully registered',
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                    history.push('/signin')
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
                    // height: '6',
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
                        height: '250px'
                        // height: '10%'
                    }}></img>
                    <div className="content" style={{
                        position: 'relative',
                        padding: '20px',
                        textAlign: 'center',
                        transition: '0.5s'
                    }}>
                        <input type='text' placeholder='name' style={{ maxWidth: '300px', borderBottom: '2px solid' }}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />

                        <br />

                        <input type='text' placeholder='email' style={{ maxWidth: '300px', borderBottom: '2px solid' }}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />

                        <br />

                        <input type='password' placeholder='password' style={{ maxWidth: '300px', borderBottom: '2px solid' }}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <br />
                        <div  style={{
                            marginTop: '2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexwrap: 'wrap',
                            flexDirection:'row'

                        }}>
                            <button className="blobby-button" onClick={() => { getVerificationCode() }}
                                style={{ fontSize: '1.2rem' }} >
                                Sign Up <span className="inner">
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
                        </div>
                        {/* <button className='btn-large' onClick={() => { getVerificationCode() }}>SignUp</button> */}
                        <br /><br />

                        {
                            gotCode
                                ?
                                <div>
                                    <input type='text' placeholder='verification code' style={{ maxWidth: '300px', borderBottom: '2px solid' }}
                                        onChange={(e) => {
                                            setVcode(e.target.value)
                                        }}
                                    />
                                    <br />
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '30px',
                                        //marginTop: '2rem'
                                    }}>
                                        <button className="blobby-button" onClick={()=>{ verifyCode() }} style={{
                                            fontSize: '1.2rem'
                                        }}>Verify <span className="inner">
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
                                    </div>
                                    {/* <button className='btn-large' onClick={() => { verifyCode() }}>Verify</button> */}
                                </div>
                                :
                                // <div>
                                //     <span>Already have an account? <Link to='/signin'>SignIn</Link> </span>
                                // </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '30px',
                                    //marginTop: '2rem'
                                }}>
                                    <h5 style={{
                                        color: '#e6ff02',
                                        fontFamily: '"Nova Round", cursive',
                                        fontWeight: 'bold',
                                        fontSize: '1.8rem'
                                    }}>Already have an account?</h5>
                                    <span>
                                        <Link to='/signin'>
                                            <button className="blobby-button" style={{
                                                marginLeft: '0.9rem',
                                                fontSize: '1.2rem'
                                            }}>Sign In <span className="inner">
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

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;