import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import { use } from 'passport';
import './design.css';
import img1 from '../images/cf.jpg'
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
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRD9watd98GuxuplYkqW5OizlYfQa_Iy4_3g&usqp=CAU"></img>
                    </a>
                    <a data-target="slide-out" className="sidenav-trigger show-on-large right" style={{ cursor: 'pointer' }}>
                        <i className="material-icons" style={{ fontSize: '80px', marginRight: '0px', color: 'teal' }}>menu</i>
                    </a>
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