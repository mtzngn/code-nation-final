import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home'; 
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import { Profile } from './pages/Profile/';
import { Swipe } from './pages/Swipe/';
import { Rate } from './pages/Rate';
import { NavigationPage } from './pages/navigation';
import { WatchParty } from './pages/WatchParty';
import { checkToken } from './utils';
import AddFriend from "./pages/AddFriend/AddFriend"
import AdminProfile from "./pages/AdminProfile/AdminProfile"
import './App.css';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    checkToken(setUser);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          {!user.user && <Redirect to='/'/>}
          <Route exact path="/">
            <Home user={user} setUser={setUser}/>
          </Route>
          <Route path="/profile">
            <Profile user={user}/>
            <NavigationPage/>
          </Route>
          <Route path="/swipe">
            <Swipe user={user} setUser={setUser}/>
            <NavigationPage/>
          </Route>
          <Route path="/rate">
            <Rate user={user} setUser={setUser}/>
            <NavigationPage/>
          </Route>
          <Route path="/watchparty">
            <WatchParty user={user}/>
            <NavigationPage/>
          </Route>
          <Route path='/navigation'>
            <NavigationPage/>
          </Route>
          <Route exact path="/addfriend">
            <AddFriend user={user}/>
          </Route>
          <Route exact path="/settings">
            <AdminProfile user={user}/>
            <NavigationPage/>
          </Route>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;