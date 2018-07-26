import React from 'react'
import httpClient from '../httpClient' 
const currentUser = httpClient.getCurrentUser()

class Comments extends React.Component {
    state = {
        comments: []
    }

    componentDidMount() {
        httpClient({method: 'get', url: `/api/stories/${this.props.storyId}`})
        .then((apiResponse) => {
          this.setState({comments: apiResponse.data.payload.comments})
        })
    }

    handleSubmit = (e) => {
       e.preventDefault()
        httpClient({
            method: 'post', 
            url: `/api/stories/${this.props.storyId}/comments/:commentid/likes`,
            data: currentUser
        })
        .then(apiResponse => {
            this.setState({comments: apiResponse.data.payload})
        })
    }

    deleteComment = (e) => {
        e.preventDefault()
        
        httpClient({
            method: 'delete',
            url: `/api/stories/${this.props.storyId}/comments/:commentid`
        })
        .then(apiResponse => {
            this.props.history.push('/')
        })
    }

    render(){
    let {comments} = this.state
    if(!comments)return(<h1>Loading...</h1>)
    return (
        <div className="Home">
            <h1>COMMENTS</h1>
            <ul>
                {this.state.comments.map((c) => {
                return (
                    <li key={c._id}>
                        <p>{c.description}</p> 
                        <p>{c.body}</p>
                        <p>{c.likes.length} likes</p> 
                        <form onSubmit={this.handleSubmit}>
                            <button>LIKE</button>
                        </form>
                        <button onClick={this.deleteComment}>DELETE</button>
                    </li>
                )
                })}
            </ul>
        </div>
    )
    }
}

export default Comments