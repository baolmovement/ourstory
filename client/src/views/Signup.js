import React from 'react'
import httpClient from '../httpClient';
import UserForm from '../components/UserForm';

class SignUp extends React.Component {

  state = {
    fields: { 
        name: '',
        email: '', 
        password: '' }
  }

  onInputChange(evt) {
    this.setState({
      fields: {
        ...this.state.fields,
        [evt.target.name]: evt.target.value
      }
    })
  }

  onFormSubmit(fields) {
    httpClient.signUp(fields).then((user) => {
    if(user) {
      this.props.onSignUpSuccess()
      this.props.history.push('/')
    }
    })
  }

  render() {
    return (
      <div className="SignUp">
        <div className="row">
          <div className="column column-33 column-offset-33">
            <h1>Sign Up</h1>
            <UserForm onSubmit={this.onFormSubmit.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp