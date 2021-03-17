import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import './design.css'

function ForgotPassword() {
    const [email, setEmail] = useState('');

    function ChangePassword() {
        fetch('/user/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({
                        html: data.error,
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                }
                else {
                    M.toast({
                        html: data.message,
                        classes: "#ce93d8 purple",
                        displayLength: 1000,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '1200px',
                flexwrap: 'wrap',
                zindex: '1'
            }}>
                <div style={{
                    position: 'relative',
                    width: '600px',
                    //minWidth: '420px',
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
                    <input type='text' placeholder='email' style={{ maxWidth: '300px', marginTop: '4rem', borderBottom: '2px solid' }}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '30px',
                        //marginTop: '2rem'
                    }}>
                        <button className="blobby-button" onClick={() => { ChangePassword() }}
                            style={{
                                marginLeft: '0.9rem',
                                fontSize: '1.2rem'
                            }}>
                            Change Password<span className="inner">
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

                    {/* <button className='btn btn-large' onClick={() => ChangePassword()}>Change Password</button> */}
                </div>

            </div>

        </div>
    )
}

export default ForgotPassword;