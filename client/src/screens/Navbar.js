import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import { use } from 'passport';
import './design.css';
import img1 from '../images/cf.jpg'
function Navbar() {
    useEffect(() => {
        var elems = document.querySelectorAll('#slide-out');
        var instances = M.Sidenav.init(elems);
    }, [])

    return (
        <div>
            {/* <nav> */}
            <nav>
<<<<<<< HEAD
                <div class="nav-wrapper">
                    <Link to="/home" class="brand-logo center">
=======
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">
>>>>>>> cf313f509bb9e874d3be25627d4abfe2d1c2a594
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRD9watd98GuxuplYkqW5OizlYfQa_Iy4_3g&usqp=CAU"></img>
                    </Link>
                    <a data-target="slide-out" className="sidenav-trigger show-on-large right" style={{ cursor: 'pointer' }}>
                        <i className="material-icons" style={{ fontSize: '80px', marginRight: '0px', color: 'teal' }}>menu</i>
                    </a>
                    <ul id="slide-out" className="sidenav nav lighten-2">
                        <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/home">Home</Link></li>
                        <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/contest">Contest</Link></li>
                        <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/profile">Profile</Link></li>
                        <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/dsa">DSA</Link></li>

                    </ul>
                </div>
            </nav>
            {/* </nav> */}
        </div>
    )
}

export default Navbar;