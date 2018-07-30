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
          this.setState({story: apiResponse.data.payload});
        })
    } 

    //Story Methods

    handleStoryLikeSubmit = (e) => {
        const { currentUser } = this.props
        e.preventDefault()
        httpClient({
            method: 'post', 
            url: `/api/stories/${this.props.match.params.id}/likes`,
            data: currentUser
        })
        .then(apiResponse => {
            let { status } = apiResponse.data;
            if (status !== "ERROR") {
                this.setState({story: apiResponse.data.payload})
            }
        })
    }

  
    handleStoryUnlike = (e) => {
        e.preventDefault()
         httpClient({
             method: 'delete', 
             url: `/api/stories/${this.state.story._id}/likes/${this.props.currentUser._id}`,
         })
         .then(apiResponse => {
            this.setState({story: apiResponse.data.payload})
        })
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

    //comment methods 
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
        console.log(this.state.story.comments)
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

    handleSubmit = (e) => {
        e.preventDefault()
        let { id } = e.target.dataset
         httpClient({
             method: 'post', 
             url: `/api/stories/${this.state.story._id}/comments/${id}/likes`,
         })
         .then(apiResponse => {
             let { payload, status } = apiResponse.data;
             if (status !== "ERROR") {
                this.handleCommentLike(payload)   
             }
         })
     }

     handleUnlike = (e) => {
        e.preventDefault()
        let { id } = e.target.dataset
         httpClient({
             method: 'delete', 
             url: `/api/stories/${this.state.story._id}/comments/${id}/likes/${this.props.currentUser._id}`,
         })
         .then(apiResponse => {
            this.setState({story: apiResponse.data.payload})
           
        })
     }
 
     deleteComment = (e) => {
         e.preventDefault()
         let { id } = e.target.dataset
         httpClient({
             method: 'delete',
             url: `/api/stories/${this.state.story._id}/comments/${id}`
         })
         .then(apiResponse => {
             const deletedComment = apiResponse.data.payload
             this.handleCommentDelete(deletedComment)
         })
     }
 
     checkIfLiked = (c) => {
         let { likes } = c;
         let liked = likes.find(l => l.userId === this.props.currentUser._id);
         if (!!liked) return <button onClick={this.handleUnlike} data-id={c._id}>UNLIKE</button>;
         return (
             <form data-id={c._id} onSubmit={this.handleSubmit}>
                 <button>LIKE</button>
             </form>
         )
     }
 
    render(){
        
        let {story} = this.state;
        if(!story)return(<h1>Loading Story...</h1>)
        const { currentUser } = this.props
        const alreadyLiked = !!story.likes.find((l) => l.userId === currentUser._id)
        return (
            <div>
               <h1 className="storyTitle">{story.title}</h1>
               
                {currentUser && currentUser._id === story._by ? 
                <Link to={`/story/${story._id}/edit`}>Edit</Link>
                 : null}  
                
                <h3>{story.likes.length} likes</h3>

                
                {alreadyLiked
                    ? (<button onClick={this.handleStoryUnlike}>UNLIKE</button>)
                    : (
                        <Like 
                            handleSubmit={this.handleStoryLikeSubmit}
                            currentUser={currentUser}  
                        />  
                    )
                }
               
                <div className="fullStory">
                    <p>{story.body}</p>
                    {story.acceptedComments.map(c => {
                        return <p key={c._id}>{c.body}</p>
                    })}
                </div>
    
                <Comments
                    currentUser={currentUser} 
                    comments = {this.state.story.comments} 
                    checkIfLiked = {this.checkIfLiked}
                    deleteComment = {this.deleteComment}
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