import React from 'react'
import httpClient from '../httpClient'  
import {Link} from 'react-router-dom'
import Like from '../components/Like.js';
import Comments from '../components/Comments.js'
import CommentFormModal from '../components/CommentForm.js'
const currentUser =  httpClient.getCurrentUser()

class Story extends React.Component {
    
    state = {
        story: null
    }

    componentDidMount() {
        httpClient({method: 'get', url: `/api/stories/${this.props.match.params.id}`})
        .then((apiResponse) => {
          this.setState({story: apiResponse.data.payload});
        })
    } 

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.props.match.params.id);
        httpClient({
            method: 'post', 
            url: `/api/stories/${this.props.match.params.id}/likes`,
            data: currentUser
        })
        .then(apiResponse => {
            this.setState({story: apiResponse.data.payload})
        })
    }

    deleteStory = (e) => {
        e.preventDefault()
        let {id} = this.props.match.params
        httpClient({
            method: 'delete',
            url: `/api/stories/${id}`
        })
        .then(apiResponse => {
            this.props.history.push('/')
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
                <Comments storyId={story._id}/> 
                <CommentFormModal storyId={story._id}/>
                <button onClick={this.deleteStory}>DELETE</button>
            </div>
        )
    }
}

export default Story//