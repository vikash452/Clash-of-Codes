import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import { use } from 'passport';
import './design.css'
import Navbar_Logo from '../images/logo.jpg'

function LandingScreen() {

    return (
        <div style={{ fontFamily: "'Nova Round', cursive" }}>

            <nav className="landing-nav">
                {/* div className="contact left">

                </div>< */}
                <div className="nav-wrapper">
                    <ul class="contact right">
                        <li>
                            <Link to='/Signin'>
                                <button className="blobby-button">
                                    Contact Us
                                <span className="inner">
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
                            </Link>
                        </li>
                    </ul>
                    <div className="brand-logo center" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',

                    }}>

                        <Link to="/home" style={{ marginTop: '1.4rem' }}>
                            <img src={Navbar_Logo} style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '20%',
                                background: 'rgba(230, 236, 233, 0.014)',
                                boxShadow: '50px 50px 100px rgba(0, 0, 0, 0.667)',
                            }}
                            ></img></Link>
                    </div>
                    {/* <ul id="nav-mobile" class="right hide-on-med-and-down"> */}
                    <ul id="nav-mobile" className="right" style={{

                    }}>
                        {/* <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li> */}
                        <li
                            style={{

                            }}>
                            <Link to='/Signin'>
                                <button className="blobby-button">

                                    Log In
                                            <span className="inner">
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
                            </Link>
                        </li>
                        <li
                            style={{

                            }}>
                            <Link to='/Signup'>
                                <button className="blobby-button">

                                    Sign Up
                                            <span className="inner">
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
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div>
                ClashOfCodes
                <div className="container">
                    <div>
                        <h2> Programming isn't about what you know, <br></br>
                        It's about what you can figure out. </h2>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingScreen;