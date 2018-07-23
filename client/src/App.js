import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import httpClient from './httpClient';
import './App.css';
import Home from './views/Home';

class App extends Component {
  state = {
    currentUser: httpClient.getCurrentUser()
  }

  onAuthSuccess() {
    this.setState({currentUser: httpClient.getCurrentUser() })
  }

  onLogOutSuccess() {
    this.setState({currentUser: null})
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path = "/" component = {Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
