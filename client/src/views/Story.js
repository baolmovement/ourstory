import React from 'react'
import httpClient from '../httpClient'  
import {Link} from 'react-router-dom'
import Like from '../components/Like.js';
import Comments from '../components/Comments.js'
import CommentFormModal from '../components/CommentForm.js'

class Story extends React.Component {
    
    state = {
        story: null,
        acceptedComments: []
    }

    componentDidMount() {
        httpClient({method: 'get', url: `/api/stories/${this.props.match.params.id}`})
        .then((apiResponse) => {
          this.setState({story: apiResponse.data.payload, acceptedComments: apiResponse.data.payload.comments.find((c) => 
              c.likes.length>1
          )});
        })
    } 

    handleSubmit = (e) => {
        const { currentUser } = this.props
        e.preventDefault()
        httpClient({
            method: 'post', 
            url: `/api/stories/${this.props.match.params.id}/likes`,
            data: currentUser
        })
        .then(apiResponse => {
            let { status } = apiResponse.data;
            if (status != "ERROR") {
                this.setState({story: apiResponse.data.payload})
            }
        })
    }

    handleCommentFormSubmit = (commentInfo) => {
        const storyId = this.props.match.params.id
        httpClient({
            method: 'post', 
            url: `/api/stories/${storyId}/comments`,
            data: commentInfo
        })
        .then(apiResponse => {
            const newComment = apiResponse.data.payload
            this.setState({
                story: {
                    ...this.state.story,
                    comments: [ ...this.state.story.comments, newComment ]
                }
            });
        })
    }

    handleCommentLike(updatedStory) {
        this.setState({ story: updatedStory })
        // const { story } = this.state
        // const commentIndex = story.comments.findIndex((c) => c._id === likedComment._id)
        // this.setState({
        //     story: {
        //         ...story,
        //         comments: [
        //             ...story.comments.slice(0, commentIndex),
        //             likedComment,
        //             ...story.comments.slice(commentIndex + 1)
        //         ]            }
        // })
    }

    handleCommentDelete(deletedComment) {
        const { story } = this.state
        this.setState({
            story: {
                ...story,
                comments: story.comments.filter((c) => c._id !== deletedComment._id)
            }
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
        let {story} = this.state;
        if(!story)return(<h1>Loading Story...</h1>)
        const { currentUser } = this.props
        const alreadyLiked = !!story.likes.find((l) => l.userId === currentUser._id)
        return (
            <div>
                <h1>STORY SHOW</h1> 
                
                <h2>{story.title}</h2>
               
                {currentUser && currentUser._id === story._by ? 
                <Link to={`/story/${story._id}/edit`}>Edit</Link>
                 : null}  
                
                <h3>{story.likes.length} likes</h3>

                {}
                
                {alreadyLiked
                    ? <button>Unlike</button>
                    : (
                        <Like 
                            handleSubmit={this.handleSubmit}
                            currentUser={currentUser}  
                        />  
                    )
                }
               
                <h4>{story.body}</h4>
                                
                <ul>
                    {story.acceptedComments.map(c => {
                        return <li key={c._id}>Accepted Comment: {c.body}</li>
                    })}
                </ul>

                <Comments
                    storyId={story._id}
                    story={this.state.story}
                    onCommentLike={this.handleCommentLike.bind(this)}
                    onCommentDelete={this.handleCommentDelete.bind(this)}
                    currentUser={currentUser}
                /> 
                
                {currentUser ? 
                <CommentFormModal
                    onFormSubmit={this.handleCommentFormSubmit.bind(this)}
                />
                : null}
                
                {currentUser && currentUser._id === story._by ?
                <button onClick={this.deleteStory}>DELETE</button>
                : null}
            </div>
        )
    }
}

export default Story//