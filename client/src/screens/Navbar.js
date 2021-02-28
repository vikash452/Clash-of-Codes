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
                    <i className="material-icons" style={{fontSize:'80px', right: '0px', top: '170px', position: 'absolute'}}>menu</i>
                </a>
                <ul id="slide-out" className="sidenav nav lighten-2">
                    <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/home">Home</Link></li>
                    <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/contest">Contest</Link></li>
                    <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/profile">Profile</Link></li>
                    <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/dsa">DSA</Link></li>
                    
                </ul>
            {/* </nav> */}
        </div>
    )
}

export default Navbar;