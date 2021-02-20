import { useEffect } from 'react';
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import './App.css';
import Home from './screens/Home.js'
import Signin from './screens/Signin'
import SignUp from './screens/Signup'

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
