import React from 'react'
import axios from 'axios' 
import {Link} from 'react-router-dom'
import httpClient from '../httpClient'
import About from './About'

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
            <h1 className="pageName">PROFILE</h1>
            <Link to={"/profile/edit"} className="navbarItem">EDIT PROFILE</Link> 
            {this.state.userstories.length===0 ?
                <div>
                    <p className="newUserMessage">Seems like you're new</p>
                    <About />
                    <Link to={'/post'} className="firstPost">Create your first post!</Link> 
                </div>
                : null
            }
            <h2>Your stories:</h2>
                {this.state.userstories.map((s) => {
                    return (
                        <div className="storyLinks">
                            <p key={s._id}>
                                <Link to={`/story/${s._id}`} className="storyName">{s.title}</Link>
                                <p className="storyLikeCount">{s.likes.length} likes</p>
                            </p>
                        </div>
                    )
                })}
            <div><button onClick={this.deleteUser}>DELETE ACCOUNT</button></div> 
           
        </div>
    )
    }
}

export default Profile