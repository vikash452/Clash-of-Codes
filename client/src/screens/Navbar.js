import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import { use } from 'passport';
import './design.css';
import img1 from '../images/cf.jpg'
import Navbar_Logo from '../images/logo.jpg'

function Navbar() {

    const [query, setQuery] = useState('')

    useEffect(() => {
        var side_nav_elem = document.querySelectorAll('#slide-out');
        M.Sidenav.init(side_nav_elem);
        var modal_elem = document.querySelectorAll('.modal');
        M.Modal.init(modal_elem)
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

    return (
        <div>
            <nav
                style={{
                    backgroundColor: 'rgb(0,0,0,0.2)',
                    borderBottom: '2px solid rgba(0, 0, 0, 1)',
                    height: '24vh',
                    textAlign: 'center',
                    //paddingTop: '1.3rem',
                }}
            >
                <ul style={{
                    display: 'grid',
                    gridTemplateColumns: '10rem auto 10rem',
                    columnGap: '2rem',
                    //overflow: 'auto',
                    width: '100%',
                }}>
                    <li style={{ marginTop: '2.4rem' }}>
                        <a data-target="slide-out" className="sidenav-trigger show-on-large left" style={{
                             cursor: 'pointer', 
                             overflow: 'hidden',
                             height: '10vh' }}>
                            <i className="material-icons" style={{ fontSize: '80px', color: 'white', height: 'auto' }}>menu</i>
                        </a>
                    </li>
                    <li style={{ marginTop: '2.2rem' }}>
                        <div className="nav-wrapper" style={{}}>
                            <div>
                                <a className="heading" style={{
                                    display: 'block'
                                }}>
                                    CLASH OF CODES
                                </a>
                            </div>

                            <ul id="slide-out" className="sidenav nav lighten-2" style={{

                            }}>
                                <li style={{
                                    marginTop: '1.2rem',
                                    marginBottom: '1.2rem',
                                }}><Link to="/home">
                                        <button className="blobby-button"
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
                                }}><Link to="/contest"><button className="blobby-button"
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
                                }}><Link to="/profile"><button className="blobby-button"
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
                                    <Link to="/dsa"><button className="blobby-button"
                                        style={{
                                            fontSize: '1.3rem',
                                            width: '100%',
                                        }}>DSA<span className="inner">
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
                                }}><a className="modal-trigger" href="#modal1"><button className="blobby-button"
                                    style={{
                                        fontSize: '1.3rem',
                                        width: '100%',
                                    }}>Report<span className="inner">
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
                                    </a></li>

                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#" className="brand-logo right" >
                            <img src={Navbar_Logo} style={{
                                width: '8rem',
                                height: '20vh',
                                borderRadius: '20%',
                                marginTop: '1rem',
                                overflow: 'hidden',
                            }}></img>
                        </a>
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