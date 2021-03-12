import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import { use } from 'passport';
import './design.css';
import img1 from '../images/cf.jpg'
import Navbar_Logo from '../images/logo.png'

function Navbar() {

    const [query,setQuery]=useState('')

    useEffect(() => {
        var side_nav_elem = document.querySelectorAll('#slide-out');
        M.Sidenav.init(side_nav_elem);
        var modal_elem=document.querySelectorAll('.modal');
        M.Modal.init(modal_elem)
    }, [])

    function SubmitQuery()
    {
        fetch('/user/submitQuery',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                userQuery:query
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.error)
            {
                console.log(data.error)
                M.toast({
                    html: data.error,
                    classes: "#ce93d8 purple",
                    displayLength: 1000,
                })
            }
            else
            {
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
            style={{backgroundColor:'rgb(0,0,0,0)',
            height:'160px',
            paddingTop:'15px'
            }}
            >
                <div className="nav-wrapper">
                    <div>
                        <a href="#" className="brand-logo right right hide-on-med-and-down" >
                            <img src={Navbar_Logo} style={{height:'150px', width:'200px'}}></img>
                        </a>
                        <a data-target="slide-out" className="sidenav-trigger show-on-large left" style={{ cursor: 'pointer' }}>
                            <i className="material-icons" style={{ fontSize: '80px', marginRight: '0px', color:'lightslategray' }}>menu</i>
                        </a>
                        <a className="heading center" style={{width:'70%'}}>
                            CLASH OF CODES
                        </a>
                    </div>
                    
                    <ul id="slide-out" className="sidenav nav lighten-2">
                        <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/home">Home</Link></li>
                        <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/contest">Contest</Link></li>
                        <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/profile">Profile</Link></li>
                        <li><Link className="sidenav-close waves-effect waves-light btn-large" to="/dsa">DSA</Link></li>
                        <li><a className="waves-effect waves-light btn modal-trigger btn-large sidenav-close" href="#modal1">Report</a></li>

                    </ul>
                </div>
            </nav>
            <div id="modal1" className="modal" >
                <div className="modal-content" style={{backgroundColor:'darkcyan'}}>
                    <h4>Report us your queries/suggestions</h4>
                    <h5><p>&#128516; &#128516; We will be happy to hear from you &#128513; &#128513; </p></h5>
                    <textarea type='text'
                    style={{color:'white',height:'200px',fontSize:'20px'}}
                    placeholder='Right down here'
                    onChange={(e)=>{
                        setQuery(e.target.value)
                    }}
                    />
                </div>
                <div className="modal-footer">
                <a className="modal-close waves-effect waves-green btn-flat">Close</a>
                <a className="modal-close waves-effect waves-green btn-flat" onClick={()=>{
                    SubmitQuery()
                }}>Submit</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar;