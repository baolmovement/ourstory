import React from 'react'
import axios from 'axios'
import StoryForm from '../components/StoryForm'
const apiClient = axios.create()


class EditStory extends React.Component{
    state = {
        story: null,
        title: "",
        description: "",
        body: ""
    }
    componentDidMount() {
        let {id} = this.props.match.params
        apiClient({method: 'get', url: `/api/stories/${id}`})
        .then(apiResponse => {
            this.setState({story: apiResponse.data.payload, title: apiResponse.data.payload.title, description: apiResponse.data.payload.description, body: apiResponse.data.payload.body})
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {title, body} = this.state
        let { id } = this.props.match.params
        apiClient({method: 'patch', url: `/api/stories/${id}`, data: {title, body}})
        .then(apiResponse => {
            this.props.history.push(`/story/${apiResponse.data.payload._id}`)
        })
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        let {title, description, body} = this.state
        if(this.state.loading) return(<h1>Loading...</h1>)
        return(
            <div>
                <h1> EDIT STORY </h1> 
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

export default EditStory