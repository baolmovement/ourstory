import React, {Component} from 'react'
import httpClient from '../httpClient' 

class Comments extends Component {

    handleSubmit = (e) => {
       e.preventDefault()
       let { id } = e.target.dataset
        httpClient({
            method: 'post', 
            url: `/api/stories/${this.props.story._id}/comments/${id}/likes`,
        })
        .then(apiResponse => {
            let { payload, status } = apiResponse.data;
            if (status !== "ERROR") {
                this.props.onCommentLike(payload)   
            }
        })
    }

    deleteComment = (e) => {
        e.preventDefault()
        let { id } = e.target.dataset
        httpClient({
            method: 'delete',
            url: `/api/stories/${this.props.storyId}/comments/${id}`
        })
        .then(apiResponse => {
            const deletedComment = apiResponse.data.payload
            this.props.onCommentDelete(deletedComment)
        })
        console.log(this.props.story.comments)
    }

    checkIfLiked = (c) => {
        let { likes } = c;
        let liked = likes.find(l => l.userId === this.props.currentUser._id);
        if (!!liked) return <button>Unlike</button>;
        return (
            <form data-id={c._id} onSubmit={this.handleSubmit}>
                <button>LIKE</button>
            </form>
        )
    }

    render(){
    let {comments} = this.props.story
    let {currentUser} = this.props;

    if(!comments)return(<h1>Loading Comments...</h1>)
    return (
        <div className="Home">
            <h1>COMMENTS</h1>
            <ul>
                {comments.map((c, i) => {
                return (
                    <li key={i}>
                        <p>{c.description}</p> 
                        <p>{c.body}</p>
                        <p>{c.likes.length} likes</p> 
                        {this.checkIfLiked(c)}
                        {currentUser._id===c._by
                        ?
                        <button data-id={c._id} onClick={this.deleteComment}>DELETE</button>
                        :
                        null
                        } 
                    </li>
                )
                })}
            </ul>
        </div>
    )
    }
}

export default Comments