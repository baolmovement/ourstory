import React from 'react'
import axios from 'axios' 
import {Link} from 'react-router-dom'
import httpClient from '../httpClient'

const apiClient = axios.create()

class Profile extends React.Component {
    state = {
        userstories: []
    }

    componentDidMount() {
        apiClient({method: 'get', url: `/api/users/${this.props.currentUser._id}`})
        .then((apiResponse) => {
          this.setState({userstories: apiResponse.data.payload.stories})
        })
    }

    deleteUser = (e) => {
        e.preventDefault()
        let {_id} = this.props.currentUser
        httpClient({
            method: 'delete',
            url: `/api/users/${_id}`
        })
        .then(apiResponse => {
            httpClient.logOut()
            this.props.onDeleteUser()
            this.props.history.push('/')
        })
    }

    render(){
    return (
        <div className="Profile">
            <h1>PROFILE</h1>
            <Link to={"/profile/edit"}>EDIT PROFILE</Link> 
           
                {this.state.userstories.map((s) => {
                    return (
                        <p key={s._id}>
                            <Link to={`/story/${s._id}`}>{s.title}</Link>
                        </p>
                    )
                })}
            <div><button onClick={this.deleteUser}>DELETE ACCOUNT</button></div> 
           
        </div>
    )
    }
}

export default Profile