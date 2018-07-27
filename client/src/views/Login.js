import React from 'react'
import httpClient from '../httpClient'

class Login extends React.Component {

  state = {
    fields: { 
        name: '',
        email: '', 
        password: '' 
    }
  }

  onInputChange(evt) {
    this.setState({
      fields: {
        ...this.state.fields,
        [evt.target.name]: evt.target.value
      }
    })
  }

  onFormSubmit(evt) {
    evt.preventDefault()
    httpClient.logIn(this.state.fields).then((user) => {
      this.setState({fields: {email: '', password:''}})
      if(user) {
        this.props.onLogInSuccess()
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div className="Login">
        <div className="row">
          <div className="column column-33 column-offset-33">
            <h1>Log In</h1>
            <form
              onChange={this.onInputChange.bind(this)}
              onSubmit={this.onFormSubmit.bind(this)}
            >
              <input type="text" placeholder="Email" name="email" autoComplete="off" />
              <input type="password" placeholder="Password" name="password" autoComplete="off" />
              <button>Log In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login