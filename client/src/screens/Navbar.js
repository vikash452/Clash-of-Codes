import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import { use } from 'passport';
import './design.css';
// import img1 from '../images/cf.jpg'
import Navbar_Logo from '../images/logo.jpg'

function Navbar() {

    const [query, setQuery] = useState('')
    const history = useHistory()

    useEffect(() => {
        var side_nav_elem = document.querySelectorAll('#slide-out');
        M.Sidenav.init(side_nav_elem);
        var modal_elem = document.querySelectorAll('.modal');
        M.Modal.init(modal_elem)

        var tooltip_elem=document.querySelectorAll('.tooltipped')
        M.Tooltip.init(tooltip_elem)

    }, [])

    function SubmitQuery() {
        fetch('/user/submitQuery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                userQuery: query
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
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
    }

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

    return (
        <div className="navbar-div" style={{ minWidth: 'fit-content' }}>
            <nav className='navbar-setter'
                // style={{
                //     backgroundColor: 'rgb(0,0,0,0.2)',
                //     borderBottom: '2px solid rgba(0, 0, 0, 1)',
                //     height: '17vw',
                //     textAlign: 'center',
                //     //paddingTop: '1.3rem',
                // }}
            >
                <ul style={{
                    display: 'grid',
                    gridTemplateColumns: '10rem 50rem 10rem',
                    columnGap: '2rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //overflow: 'auto',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}>
                    <li style={{ position: 'absolute' }}>
                        <a data-target="slide-out" className="sidenav-trigger show-on-large left"
                            style={{
                                cursor: 'pointer',
                                overflow: 'hidden',
                                height: '10vh'
                            }}>
                            <i className="material-icons">menu</i>
                        </a>
                    </li>
                    
                    <li className="Heading-navbar" style={{position: 'absolute'}}>
                        <div className="heading">
                            {/* <Link to="/home" style={{ fontSize: '4.7vw', margin: 'auto' }}>CLASH OF CODES</Link> */}
                            <Link to="/home" className="heading-content">CLASH OF CODES</Link>
                        </div>
                        <div className="nav-wrapper">
                            <ul id="slide-out" className="sidenav nav lighten-2">
                                <li style={{
                                    marginTop: '1.2rem',
                                    marginBottom: '1.2rem',
                                }}><Link to="/home">
                                        <button className="blobby-button sidenav-close tooltipped"
                                            data-position='right'
                                            data-tooltip="Go to the home page"
                                            style={{
                                                fontSize: '1.3rem',
                                                width: '100%',
                                            }}>Home<span className="inner">
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
                                <li style={{
                                    marginTop: '1.2rem',
                                    marginBottom: '1.2rem',
                                }}><Link to="/contest"><button className="blobby-button sidenav-close tooltipped"
                                data-position='right'
                                data-tooltip="Join or Create a contest from all your unattempted questions on codeforces"    
                                style={{
                                        fontSize: '1.3rem',
                                        width: '100%',
                                    }}>Contest<span className="inner">
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
                                <li style={{
                                    marginTop: '1.2rem',
                                    marginBottom: '1.2rem',
                                }}><Link to="/profile"><button className="blobby-button sidenav-close tooltipped"
                                    data-position='right'
                                    data-tooltip="View/Set your handles and don't forget to add your friends!!"
                                    style={{
                                        fontSize: '1.3rem',
                                        width: '100%',
                                    }}>Profile<span className="inner">
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
                                <li style={{
                                    marginTop: '1.2rem',
                                    marginBottom: '1.2rem',
                                }}>
                                    <Link to="/dsa">
                                        <button className="blobby-button sidenav-close tooltipped"
                                        data-position='right'
                                        data-tooltip="Practice Data Structures & Algorithms and keep a track on your daily progress"
                                            style={{
                                                fontSize: '1.3rem',
                                                width: '100%',
                                            }}>
                                            DSA
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
                                <li style={{
                                    marginTop: '1.2rem',
                                    marginBottom: '1.2rem',
                                }}>
                                    <Link to="/codeforces">
                                        <button className="blobby-button sidenav-close tooltipped"
                                            data-position='right'
                                            data-tooltip="Complete statistics of your codeforces performance"
                                            style={{
                                                fontSize: '1.3rem',
                                                width: '100%',
                                            }}>
                                            Codeforces
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
                                <li style={{
                                    marginTop: '1.2rem',
                                    marginBottom: '1.2rem',
                                }}>
                                    <Link to="/codechef">
                                        <button className="blobby-button sidenav-close tooltipped"
                                            data-position='right'
                                            data-tooltip="Complete statistics of your Codechef performance"
                                            style={{
                                                fontSize: '1.3rem',
                                                width: '100%',
                                            }}>
                                            Codechef
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
                                        marginTop: '1.2rem',
                                        marginBottom: '1.2rem',
                                    }}>
                                    <a className="modal-trigger" href="#modal1">
                                        <button className="blobby-button sidenav-close tooltipped"
                                        data-position='right'
                                        data-tooltip="Found a bug? Some feedback or suggestion? We will be happy to hear from you"
                                            style={{
                                                fontSize: '1.3rem',
                                                width: '100%',
                                            }}>
                                            Report
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
                                    </a>
                                </li>
                                <li
                                    style={{
                                        marginTop: '1.2rem',
                                        marginBottom: '1.2rem',
                                    }}>
                                    <a className="" href="#">
                                        <button className="blobby-button sidenav-close tooltipped" onClick={() => { Logout() }}
                                            data-position='right'
                                            data-tooltip="Hope you liked the website"
                                            style={{
                                                fontSize: '1.3rem',
                                                width: '100%',
                                            }}>
                                            Logout
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
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </li>
                    <li style={{ height: '100%' }}>
                        <div className="brand-logo right" style={{ margin: '1rem' }}>
                            <Link to="/home" style={{ padding: '0', marginRight: '1rem' }}>
                                <img src={Navbar_Logo} style={{
                                    width: '8rem',
                                    height: '8rem',
                                    borderRadius: '20%',
                                    overflow: 'hidden',
                                }}
                                    className="hide-on-med-and-down"></img></Link>
                        </div>
                    </li>
                </ul>

            </nav>
            <div id="modal1" className="modal" >
                <div className="modal-content" style={{ backgroundColor: 'darkcyan' }}>
                    <h4>Report us your queries/suggestions</h4>
                    <h5><p>&#128516; &#128516; We will be happy to hear from you &#128513; &#128513; </p></h5>
                    <textarea type='text'
                        style={{ color: 'white', height: '200px', fontSize: '20px' }}
                        placeholder='Right down here'
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                    />
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">Close</a>
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => {
                        SubmitQuery()
                    }}>Submit</a>
                </div>

            </div>
        </div >
    )
}

export default Navbar;