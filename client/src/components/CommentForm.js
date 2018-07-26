import React, {Component} from 'react'
import httpClient from '../httpClient'


class CommentFormModal extends Component {
    state = {
        description: "",
        body: ""
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => {
        e.preventDefault()
        let {description, body} = this.state
        httpClient({
            method: 'post', 
            url: `/api/stories/${this.props.storyId}/comments`,
            data: {description, body}
        })
        .then(apiResponse => {
            this.setState({comments: apiResponse.data.payload})
        })
    }
    
    render(){
        return ( 
            <div className="CommentForm">
                <form
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                >
                    <input type="text" placeholder="description" name="description" autoComplete="off" />
                    <input type="text" placeholder="body" name="body" autoComplete="off" />
                    <button>Submit</button>
                </form>
            </div>     
        )
    }
}

export default CommentFormModal

