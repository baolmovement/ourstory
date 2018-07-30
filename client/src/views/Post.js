import React, {Component} from 'react'
import axios from 'axios'
import StoryForm from '../components/StoryForm' 

const apiClient = axios.create()

class Post extends Component {
    state = {
        title: "",
        description: "",
        body: ""
    }

    handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => {
        e.preventDefault()
        let {title, description, body} = this.state
        apiClient({
            method: 'post', 
            url: '/api/stories',
            data: {title, description, body}
        })
        .then(apiResponse => {
            this.props.history.push('/')
        })
    }

    render() {
        let { title, description, body } = this.state
        return(
            <div>
                <h1>Create a Story</h1>
                <StoryForm 
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    title={title} 
                    description={description}
                    body={body}
                />
            </div>
        )
    }
}

export default Post