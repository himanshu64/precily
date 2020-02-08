import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './config/firebaseConfig';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Profile from './components/profile';
import Navbar from './components/navbar'
import Register from './components/register'
import './styles/tailwind.css';


const App = () => {
  const [authenticated, setautheticated] = useState(false);
 
    useEffect(() => {
        firebase.auth().onAuthStateChanged((authenticated) => {
          console.log(authenticated)
          authenticated 
                ? setautheticated(true)
                : setautheticated(false);
        });
        
    }, [authenticated]);

  
  return (
    <Router>
      <div>
        <Navbar authenticated={authenticated}/>
        <Switch>
          <Route exact path="/">
            <Login authenticated={authenticated}/>
          </Route>
          <Route path="/register">
            <Register authenticated={authenticated}/>
          </Route>
          <Route path="/dashboard" authenticated={authenticated}>
            <Dashboard  authenticated={authenticated}/>
          </Route>
          <Route path="/profile" authenticated={authenticated}>
            <Profile  authenticated={authenticated}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
