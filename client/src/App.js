import { useEffect } from 'react';
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import './App.css';
import Home from './screens/Home.js'
import Signin from './screens/Signin'
import SignUp from './screens/Signup'
import Profile from './screens/Profile'
import Contest from './screens/Contest'
import Room from './screens/Room'

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
      else
      history.push('/signup')
    }
    else
    {
      if(history.location.pathname.startsWith('/profile'))
      history.push('/profile')
      else
      history.push('/home')
    }
  },[])

  return(
    <div>
      <Route exact path='/home'>
          <Home/>
        </Route>
        <Route exact path='/signin'>
          <Signin/>
        </Route>
        <Route exact path='/signup'>
          <SignUp/>
        </Route>
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route exact path='/contest'>
          <Contest/>
        </Route>
        <Route exact path='/room/:roomId'>
          <Room/>
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
