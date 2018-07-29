import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import httpClient from './httpClient';
import './App.css';
import  './styles/index.css';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Story from './views/Story'
import SignUp from './views/Signup';
import LogIn from './views/Login'; 
import LogOut from './views/Logout'; 
import Profile from './views/Profile';
import Post from './views/Post'; 
import EditUser from './views/EditUser';
import EditStory from './views/EditStory';



class App extends Component {
  state = {
    currentUser: httpClient.getCurrentUser(),
    userId: null
  }

  onAuthSuccess() {
    this.setState({currentUser: httpClient.getCurrentUser() })
    console.log(this.state.currentUser)
  }

  onLogOutSuccess() {
    this.setState({currentUser: null})
  }

  render() {
    return (
      <div className="App">
        <NavBar currentUser={this.state.currentUser}/>
        <Switch>
          <Route path = "/login" render = {(routeProps) => {
            return <LogIn {...routeProps} onLogInSuccess={this.onAuthSuccess.bind(this)}/>
          }} />
          
          <Route path = "/signup" render = {(routeProps) => {
            return <SignUp {...routeProps} onSignUpSuccess = {this.onAuthSuccess.bind(this)}/>
          }} />
          
          <Route path="/logout" render={(routeProps) => {
            return <LogOut {...routeProps} onLogOutSuccess={this.onLogOutSuccess.bind(this)}/>
          }} />
          
          <Route path = "/profile/edit" render={(routeProps) => {
            return this.state.currentUser
            ? (
              <EditUser {...routeProps}
                currentUser={this.state.currentUser}
                onUpdateProfileSuccess={this.onAuthSuccess.bind(this)}
              />
            )
            : <Redirect to="/login"/>
          }} />
          
          <Route path = "/profile" render={(routeProps) => {
            return this.state.currentUser
            ? <Profile {...routeProps} currentUser={this.state.currentUser} onDeleteUser={this.onLogOutSuccess.bind(this)}/>
            : <Redirect to="/login"/>
          }} />

          <Route path = "/story/:id/edit" render={(routeProps) => {
            return this.state.currentUser
            ? (
              <EditStory {...routeProps}
                currentUser={this.state.currentUser}
              />
            )
            : <Redirect to="/login"/>
          }} />
         
          <Route exact path = "/story/:id" render={(routeProps) => {
            return <Story {...routeProps} currentUser={this.state.currentUser} />
          }} />
          
          <Route path='/post' component={Post} />
          
          <Route exact path = "/" component = {Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
