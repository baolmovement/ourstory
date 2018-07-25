import React from 'react'

class UserForm extends React.Component {

    constructor(props) {
        super(props)
        const { initialValues } = this.props
        if(initialValues) {
            this.state = { fields: { ...initialValues, password: '' } }
        } else {
            this.state = { fields: { name: '', email: '', password: '' } }
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
        this.props.onSubmit(this.state.fields)
        //clear fields
    }
    render(){

        const { name, email } = this.state.fields
        return ( 
            <div className="UserForm">
                <form
                    onChange={this.onInputChange.bind(this)}
                    onSubmit={this.onFormSubmit.bind(this)}
                >
                    <input type="text" placeholder="Name" name="name" autoComplete="off" defaultValue={name} />
                    <input type="text" placeholder="Email" name="email" autoComplete="off" defaultValue={email} />
                    <input type="password" placeholder="Password" name="password" autoComplete="off" />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UserForm

