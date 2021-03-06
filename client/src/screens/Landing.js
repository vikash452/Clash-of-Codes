import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M, { Slider } from 'materialize-css'
import './design.css'
import Navbar_Logo from '../images/logo.jpg'
import BlobbyButton from '../assets/BlobbyButton'
import CF from '../images/cf.jpg'
import LandingPage from '../images/landingPage.png'

function LandingScreen() {
    
    useEffect(()=>{

        document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {
                duration: 100,
                indicators: true,
            });
        });
        M.AutoInit()
        var side_nav_elem=document.querySelectorAll('#slide-out')   // DONT PUT QUERY SELECTOR ALL HERE
        M.Sidenav.init(side_nav_elem);

        var bigDiv=document.querySelector('.big_div')
        let diff_height = -130;
        let diff_const = 0;

        // console.log(bigDiv)

        if(bigDiv)
        {
            setInterval(() => {
                
                    bigDiv.style.transform = `translateY(${diff_height}px)`;
                    diff_height -= (150 + diff_const);
                    if (diff_height < -500) {
                        diff_height = 0;
                        diff_const = 0;
                    }
                    
            }, 3000);
        }
        
        var sideShift=document.querySelector('.sideShift')
        // sideShift.style.width='100px'

    },[])

    return (
        <div style={{ fontFamily: "'Nova Round', cursive"}}>

            <nav className="landing-nav">
                <div className="nav-wrapper">
                    <ul className="contact hide-on-med-and-down">
                        <li>
                            <Link to='/contactus'>
                                <button className="blobby-button">
                                 {/* style={{height: '6vh'}}> */}
                                    Contact Us
                                    <BlobbyButton/>
                                </button>
                            </Link>
                        </li>
                    </ul>

                    <ul className="sidenav" id="slide-out" 
                    style={{backgroundImage:`url(${LandingPage})`, paddingTop:'100px', maxWidth:'fit-content'}}>
                        <li>
                            <Link to='/getContests'>
                                <button className="blobby-button sidenav-close" >
                                {/* // style={{height: '8vh'}}> */}
                                    Get all contests
                                    <BlobbyButton/>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/signin'>
                                <button className="blobby-button sidenav-close" >
                                {/* // style={{height: '8vh'}}> */}
                                    Signin
                                    <BlobbyButton/>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/signup'>
                                <button className="blobby-button sidenav-close" >
                                {/* style={{height: '8vh'}}> */}
                                    Signup
                                    <BlobbyButton/>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/contactus'>
                                <button className="blobby-button sidenav-close" >
                                {/* style={{height: '8vh'}}> */}
                                    Contact Us
                                    <BlobbyButton/>
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

                        <Link to="/home" style={{ padding: '20px 10px 10px'}}>
                                <img src={Navbar_Logo} style={{
                                    width: '120px',
                                    height: '100%',
                                    borderRadius: '20%',
                                    background: 'rgba(230, 236, 233, 0.014)',
                                    boxShadow: '50px 50px 100px rgba(0, 0, 0, 0.667)',
                                }}
                                />
                        </Link>
                        <a href="#" data-target="slide-out" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                    </div>
                    {/* <ul id="nav-mobile" class="right hide-on-med-and-down"> */}
                    

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <Link to='/getContests'>
                                <button className="blobby-button">
                                 {/* style={{height:'6vh'}}> */}
                                    Get All contests
                                    <BlobbyButton/>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/signin'>
                                <button className="blobby-button">
                                 {/* style={{height:'6vh'}}> */}
                                    Log In
                                    <BlobbyButton/>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/signup'>
                                <button className="blobby-button">
                                     {/* style={{height:'6vh'}}> */}
                                    Sign Up
                                    <BlobbyButton/>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div>
                {/* ClashOfCodes */}
                <div className="landing-container">
                    <div className='boil_text'>
                        <div className='big_div'>
                            <h1>Competitive Coding</h1>
                            <h1>Data structures & Algorithms</h1>
                            <h1>Codeforces</h1>
                            <h1>Codechef</h1>
                        </div>
                    </div>
                    <br></br>
                    
                    <div className="content-card">
                        <h2> "Programming isn't about what you know, <br></br>
                        It's about what you can figure out." </h2>
                        <h3> -Chris Pine (Author of Learn To Code) </h3>
                    </div>

                   
                    </div>

            </div>
        </div>
    )
}

export default LandingScreen;