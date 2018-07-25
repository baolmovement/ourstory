import React from 'react'
import axios from 'axios' 
import {Link} from 'react-router-dom'

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

    render(){
    return (
        <div className="Profile">
            <h1>PROFILE</h1>
            <Link to={"/profile/edit"}>EDIT PROFILE</Link>
            <ul>
                {this.state.userstories.map((s) => {
                return (
                    <li key={s._id}>
                        <Link to={`/story/${s._id}`}>{s.title}</Link>
                    </li>
                )
                })}
            </ul>
        </div>
    )
    }
}

export default Profile