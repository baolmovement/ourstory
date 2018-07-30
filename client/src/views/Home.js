import React from 'react'
import axios from 'axios' 
import {Link} from 'react-router-dom'

const apiClient = axios.create()

class Home extends React.Component {
    state = {
        stories: []
    }

    componentDidMount() {
        apiClient({method: 'get', url: '/api/stories'})
        .then((apiResponse) => {
          this.setState({stories: apiResponse.data.payload})
        })
    }

    render(){
    return (
        <div className="Home">
            <h1>HOME</h1>
                {this.state.stories.map((s) => {
                return (
                    <p key={s._id}>
                        <div className="storyLinks">
                            <Link to={`/story/${s._id}`} className="storyName">{s.title}</Link>
                            <p className="storyLikeCount">{s.likes.length} likes</p>
                        </div>
                    </p>
                )
                })}    
        </div>
    )
    }
}

export default Home