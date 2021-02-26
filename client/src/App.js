import { useEffect } from 'react';
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import './App.css';
import Home from './screens/Home.js'
import Signin from './screens/Signin'
import SignUp from './screens/Signup'
import Profile from './screens/Profile'
import Contest from './screens/Contest'
import Room from './screens/Room'
import Navbar from './screens/Navbar'
import ForgotPassword from './screens/ForgotPassword'
import UpdatePassword from './screens/UpdatePassword'
import Codeforces from './screens/Codeforces'
import img1 from './images/img1.jpg';
function AllRouting()
{
  const history=useHistory();

  useEffect(()=>{
    var userDetails=localStorage.getItem('user')
    // console.log(userDetails)
    if(!userDetails)
    {
      if(history.location.pathname.startsWith('/signin'))
      history.push('/signin')
      else if(history.location.pathname.startsWith('/forgotPassword'))
      history.push('/forgotPassword')
      else if(history.location.pathname.startsWith('/updatePassword'))
      history.push(history.location.pathname)
      else
      history.push('/signup')
    }
    else
    {
      // console.log(history.location.pathname === '/')
      if(history.location.pathname === '/')
      history.push('/home')
      // if(history.location.pathname.startsWith('/profile'))
      // history.push('/profile')
      // else
      // history.push('/home')
    }
  },[])

  return(
    <div>
      <Route exact path='/home' >
          <Navbar/>
          <Home/>
        </Route>
        <Route exact path='/signin'>
          <Signin/>
        </Route>
        <Route exact path='/signup'>
          <SignUp/>
        </Route>
        <Route exact path='/profile'>
          <Navbar/>
          <Profile/>
        </Route>
        <Route exact path='/codeforces'>
          <Navbar/>
          <Codeforces/>
        </Route>
        <Route exact path='/contest'>
          <Navbar/>
          <Contest/>
        </Route>
        <Route exact path='/room/:roomId'>
          <Navbar/>
          <Room/>
        </Route>
        <Route exact path='/forgotPassword'>
          <ForgotPassword/>
        </Route>
        <Route exact path='/updatePassword/:vCode'>
          <UpdatePassword/>
        </Route>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <h1>WELCOME TO CLASH OF CODES</h1>
      <BrowserRouter>
        <AllRouting/>
      </BrowserRouter>
    </div>
  );
}

export default App;
