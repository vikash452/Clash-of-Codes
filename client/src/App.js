import { useEffect } from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom'
import './App.css';
// import CssBaseline from '@material-ui/core/CssBaseline';
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
import DSA from './screens/DSA'
import './screens/design.css'
import img from './images/img3.jpg'


function AllRouting() {
  const history = useHistory();

  useEffect(() => {
    var userDetails = localStorage.getItem('user')
    // console.log(userDetails)
    if (!userDetails) {
      if (history.location.pathname.startsWith('/signin'))
        history.push('/signin')
      else if (history.location.pathname.startsWith('/forgotPassword'))
        history.push('/forgotPassword')
      else if (history.location.pathname.startsWith('/updatePassword'))
        history.push(history.location.pathname)
      else
        history.push('/signup')
    }
    else {
      if (history.location.pathname === '/')
        history.push('/home')
      else if (history.location.pathname.startsWith('/signin') || history.location.pathname.startsWith('/signup') || history.location.pathname.startsWith('/forgotPassword') || history.location.pathname.startsWith('/updatePassword'))
        history.push('/home')
    }
  }, [])

  return (
    <div>
      <Route exact path='/home' >
        <Navbar />
        <Home />
      </Route>
      <Route exact path='/signin'>
        <Signin />
      </Route>
      <Route exact path='/signup'>
        <SignUp />
      </Route>
      <Route exact path='/profile'>
        <Navbar />
        <Profile />
      </Route>
      <Route exact path='/codeforces'>
        <Navbar />
        <Codeforces />
      </Route>
      <Route exact path='/contest'>
        <Navbar />
        <Contest />
      </Route>
      <Route exact path='/dsa'>
        <Navbar />
        <DSA />
      </Route>
      <Route exact path='/room/:roomId'>
        <Navbar />
        <Room />
      </Route>
      <Route exact path='/forgotPassword'>
        <ForgotPassword />
      </Route>
      <Route exact path='/updatePassword/:vCode'>
        <UpdatePassword />
      </Route>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <h1 className="OuterHeading" style={{ opacity: '0.55' }}>
        <div className="heading">WELCOME TO CLASH OF CODES</div></h1>
      <BrowserRouter>
        <AllRouting />
      </BrowserRouter>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="5%" stopColor="green" />
          <stop offset="95%" stopColor="yellow" />
        </linearGradient>
        <path fill="url(#Gradient2)" fillOpacity="1"
          d="M0,224L48,234.7C96,245,192,267,288,272C384,277,480,267,576,256C672,245,768,235,864,240C960,245,1056,267,1152,272C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>
  );
}

export default App;
