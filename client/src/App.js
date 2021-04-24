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
import Codechef from './screens/Codechef'
import CodechefAuthorization from './screens/ChefAuthorization'
import DSA from './screens/DSA'
import Compare from './screens/Compare'
import CompareCodechef from './screens/CompareCodechef'
import DSA_stats from './screens/DSA_stats'
import ContactUs from './screens/ContactUs'
import CodeforcesPractice from './screens/CodeforcesPractice'
import Division from './screens/Division'
import './screens/design.css'
import LandingScreen from './screens/Landing'
import Header from './screens/Header'
import Footer from './screens/Footer'
import LandingPageBackground from './images/landingPage.png'
import AmongUsBackground from './images/amongus.jpg'


function AllRouting() {
  const history = useHistory();

  function Redirecter(userDetails)
  {
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
      else if (history.location.pathname.startsWith('/contactus'))
        history.push('/contactus')
      else
        history.push('/landing')
    }
    else {
      if (history.location.pathname === '/')
        history.push('/home')
      else if (history.location.pathname.startsWith('/signin') || history.location.pathname.startsWith('/signup') || history.location.pathname.startsWith('/forgotPassword') || history.location.pathname.startsWith('/updatePassword'))
        history.push('/home')
    }
  }

  useEffect(() => {
    var userDetails = localStorage.getItem('user')
    if(!userDetails)
    {
      fetch('/details',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(res=>res.json())
      .then((data)=>{
        console.log(data)
        if(!data.error)
        {
          localStorage.setItem('user',JSON.stringify(data.foundUser))
          localStorage.setItem('jwt',data.token)
          userDetails=data
          Redirecter(userDetails)
        }
        else
        {
          Redirecter(userDetails)
          // history.push('/landing')
        }
      })
    }
    else
    {
      Redirecter(userDetails)
    }

    // if(history.location.pathname.startsWith('/landing'))
    // {
    //   console.log(history.location.pathname)
    //   document.body.style.backgroundImage=`url('${LandingPageBackground}')`
    // }
    // else
    // {
    //   console.log(history.location.pathname)
    //   document.body.style.backgroundImage=`url('${AmongUsBackground}')`
    // }

    // console.log(userDetails)
    // if (!userDetails) {
    //   if (history.location.pathname == '/')
    //     history.push('/landing')
    //   if (history.location.pathname.startsWith('/signin'))
    //     history.push('/signin')
    //   else if (history.location.pathname.startsWith('/forgotPassword'))
    //     history.push('/forgotPassword')
    //   else if (history.location.pathname.startsWith('/updatePassword'))
    //     history.push(history.location.pathname)
    //   else if (history.location.pathname.startsWith('/signup'))
    //     history.push(history.location.pathname)
    //   else
    //     history.push('/landing')
    // }
    // else {
    //   if (history.location.pathname === '/')
    //     history.push('/home')
    //   else if (history.location.pathname.startsWith('/signin') || history.location.pathname.startsWith('/signup') || history.location.pathname.startsWith('/forgotPassword') || history.location.pathname.startsWith('/updatePassword'))
    //     history.push('/home')
    // }
  }, [])

  return (
    <div>
      <Route exact path='/home' >
        <Navbar />
        <Home />
        <Footer/>
      </Route>
      <Route exact path='/landing' >
        <LandingScreen/>
      </Route>
      <Route exact path='/contactus' >
        <ContactUs/>
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
        <Footer/>
      </Route>
      <Route exact path='/codeforces'>
        <Navbar />
        <Codeforces />
        <Footer/>
      </Route>
      <Route exact path='/codechef'>
        <Navbar />
        <Codechef />
        <Footer/>
      </Route>
      <Route exact path='/codechefdone'>
        <Navbar />
        <CodechefAuthorization />
        <Footer/>
      </Route>
      <Route exact path='/contest'>
        <Navbar />
        <Contest />
        <Footer/>
      </Route>
      <Route exact path='/compareCodeforces'>
        <Navbar />
        <Compare />
        <Footer/>
      </Route>
      <Route exact path='/compareCodechef'>
        <Navbar />
        <CompareCodechef />
        <Footer/>
      </Route>
      <Route exact path='/dsa'>
        <Navbar />
        <DSA />
        <Footer/>
      </Route>
      <Route exact path='/codeforcesPractice'>
        <Navbar />
        <CodeforcesPractice />
        <Footer/>
      </Route>
      <Route exact path='/division'>
        <Navbar />
        <Division />
        <Footer/>
      </Route>
      <Route exact path='/dsa_stats'>
        <Navbar />
        <DSA_stats />
        <Footer/>
      </Route>
      <Route exact path='/room/:roomId'>
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
export default App;
