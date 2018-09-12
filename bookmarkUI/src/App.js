import React, { Component } from 'react';
import UserContainer from "./Component/User/UserContainer";
import LoginContainer from "./Component/Login/LoginContainer";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className='slate'>
            <div>
              <Route path="/user" component={(props) => (<UserContainer   {...props}  />)} />
              <Route path="/login" component={(props) => (<LoginContainer  {...props}  />)} />
              {
                getCookie('uEmail') == "admin@admin.com" ?
                (
                  <Route exact path="/" render={() => (
                    <Redirect to={"/user"} />
                  )}/>
                ) : 
                (
                  <Route exact path="/" render={() => (
                    <Redirect to={"/login"} />
                  )}/>
                )
              }
              
            </div>
        </div>
        </div>
      </Router>

    );
  }
}

export default App;


function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2)
    return parts
      .pop()
      .split(";")
      .shift();
}