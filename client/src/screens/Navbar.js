import {useEffect,useState} from 'react'
import {useHistory,Link} from 'react-router-dom'
import M from 'materialize-css'
import { use } from 'passport';
import './design.css';
function Navbar()
{
    useEffect(()=>{
        var elems = document.querySelectorAll('#slide-out');
        var instances = M.Sidenav.init(elems);
    },[])

    return (
        <div>
            {/* <nav> */}
                <a data-target="slide-out" className="sidenav-trigger show-on-large" style={{cursor:'pointer'}}>
                    <i className="material-icons">menu</i>
                </a>
                {/* <div className='container'>
                    <ul id='nav-mobile' className='right hide-on-med-and-down'>
                        <li><Link to='/home'>Home</Link></li>
                    </ul>
                </div> */}
                <ul id="slide-out" className="sidenav nav darken-4">
                    <li><Link className="sidenav-close" to="/contest"><h3>Contest</h3></Link></li>
                    <li><Link className="sidenav-close" to="/profile"><h3>Profile</h3></Link></li>
                    <li><Link className="sidenav-close" to="/home"><h3>Home</h3></Link></li>
                </ul>
            {/* </nav> */}
        </div>
    )
}

export default Navbar;