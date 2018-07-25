import React from 'react'
import httpClient from '../httpClient'  
import {Link} from 'react-router-dom'
import Like from '../components/Like.js';
const currentUser =  httpClient.getCurrentUser()

class Story extends React.Component {
    
    state = {
        story: null, 
        likes: null
    }

    componentDidMount() {
        httpClient({method: 'get', url: `/api/stories/${this.props.match.params.id}`})
        .then((apiResponse) => {
          this.setState({story: apiResponse.data.payload, likes: apiResponse.data.payload.likes})
        })
    } 

    handleSubmit = (e) => {
        e.preventDefault()
        httpClient({
            method: 'post', 
            url: `/api/stories/${this.props.match.params.id}`,
            data: currentUser
        })
        .then(apiResponse => {
            this.props.history.push(`/stories/${apiResponse.data.payload._id}`)
        })
    }

    render(){
        let {story} = this.state
        if(!story)return(<h1>Loading...</h1>)
        return (
            <div>
                <h1>STORY SHOW</h1> 
                <h2>{story.title}</h2>
                <Link to={`/story/${story._id}/edit`}>Edit</Link>
                <h3>{story.likes.length} likes</h3>
                <Like 
                    handleSubmit={this.handleSubmit}
                    currentUser={currentUser}  
                />
            </div>
        )
    }
}

export default Story//