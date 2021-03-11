import { useEffect } from 'react';
import ReactDOM from "react-dom";
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
import LandingScreen from './screens/Landing'
import Header from './screens/Header'
import Footer from './screens/Footer'


function AllRouting() {
  const history = useHistory();

  useEffect(() => {
    var userDetails = localStorage.getItem('user')
    // console.log(userDetails)
    if (!userDetails) {
      if (history.location.pathname == '/')
        history.push('/landing')
      if (history.location.pathname.startsWith('/signin'))
        history.push('/signin')
      else if (history.location.pathname.startsWith('/forgotPassword'))
        history.push('/forgotPassword')
      else if (history.location.pathname.startsWith('/updatePassword'))
        history.push(history.location.pathname)
      else if (history.location.pathname.startsWith('/signup'))
        history.push(history.location.pathname)
      else
        history.push('/landing')
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
        <Header />
        <Navbar />
        <Home />
        <Footer/>
      </Route>
      <Route exact path='/landing' >
        <LandingScreen />
      </Route>
      <Route exact path='/signin'>
        <Signin />
      </Route>
      <Route exact path='/signup'>
        <SignUp />
      </Route>
      <Route exact path='/profile'>
        <Header />
        <Navbar />
        <Profile />
        <Footer/>
      </Route>
      <Route exact path='/codeforces'>
        <Header />
        <Navbar />
        <Codeforces />
        <Footer/>
      </Route>
      <Route exact path='/contest'>
        <Header />
        <Navbar />
        <Contest />
        <Footer/>
      </Route>
      <Route exact path='/dsa'>
        <Header />
        <Navbar />
        <DSA />
        <Footer/>
      </Route>
      <Route exact path='/room/:roomId'>
        <Header />
        <Navbar />
        <Room />
        <Footer/>
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

<div className="App" style={{display:'flex', flexDirection:'column'}}>
      <BrowserRouter>
        <AllRouting />
      </BrowserRouter>
    </div>
  );
}
debugger; // TO INSPECT THE PAGE BEFORE 1ST RENDER

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
