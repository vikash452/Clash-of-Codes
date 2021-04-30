import BlobbyButton from '../screens/BlobbyButton'
import M from 'materialize-css'
import LandingPage from '../images/landingPage.png'
import Navbar_Logo from '../images/logo.jpg'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'

function LandingNavbar()
{
    useEffect(()=>{
        var side_nav_elem=document.querySelectorAll('#slide-out')   // DONT PUT QUERY SELECTOR ALL HERE
        M.Sidenav.init(side_nav_elem);
    })

    return (
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

                        <Link to="/landing" style={{ padding: '20px 10px 10px'}}>
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
                    {/* <ul>
                        <li>
                        <a href="#" data-target="slide-out" className="sidenav-trigger right">
                            <i className="material-icons">menu</i>
                        </a>
                        </li>
                    </ul> */}
                </div>
            </nav>
    )
}

export default LandingNavbar;