import React from 'react';
import UserForm from '../components/UserForm';
import httpClient from '../httpClient'

class EditUser extends React.Component{
    state = {
        loading: true,
        fields: {
            name: "",
            email: "",
            password: ""
        }
    }
    componentDidMount() {
        let {_id} = this.props.currentUser
        httpClient({method: 'get', url: `/api/users/${_id}`})
        .then(apiResponse => {
            const { name, email } = apiResponse.data.payload.user
            this.setState({ loading: false, fields: { name, email } })
        }) 
    } 

    handleSubmit = (fields) => {
        let {name, email, password} = fields
        httpClient.updateProfile({name, email, password})
        .then(apiResponse => {
            this.props.onUpdateProfileSuccess()
            this.props.history.push(`/profile`)
        })
    }

    render(){
        if(this.state.loading) return(<h1>Loading...</h1>)
        return(
            <div>
                <h1> EDIT PROFILE </h1> 
                <UserForm onSubmit={this.handleSubmit.bind(this)} initialValues={this.state.fields}/>

                {/* <UserForm onSubmit={(fields) => { alert(JSON.stringify(fields))}} /> */}
            </div>
        )
    }
}

export default EditUser