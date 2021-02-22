import React from 'react';
import './App.css';
import { Home } from './pages/Home'; 
import { Route, BrowserRouter, Link, Redirect } from "react-router-dom";
import Profile from './pages/Home/profile/';
 



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div>
      <ul>
          <Link to='/'>&nbsp;Home&nbsp;</Link>
          <Link to='/Register'>&nbsp;Register&nbsp;</Link>
          <Link to='/Login'>&nbsp;Login&nbsp;</Link>
          <Link to='/Logout'>&nbsp;Logout&nbsp;</Link>
          <Link to='/Profile'>&nbsp;Profile&nbsp;</Link>

        </ul>
      </div>

      <div>
            <Route exact path="/">
              <Home/>
            </Route>

            <Route exact path="/Profile">
              <Profile/>
            </Route>

            <Route exact path="/Register" />
            <Route path='/Login' />
            <Route path='/Logout' />
          </div>

    </div>
    </BrowserRouter>
  );
}

 
export default App;
