import React, {Component} from 'react'

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
        this.props.onFormSubmit(this.state)
        // e.target.value = null
        this.setState({
            description: "",
            body: ""
        })
    }
    
    render(){
        return ( 
            <div className="CommentForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="description" name="description"
                        autoComplete="off"
                        className="descriptionInput"
                        onChange={this.handleChange}
                        value={this.state.description}
                    />
                    <div className="bodyContainer">
                        {/* <input type="text" placeholder="body" name="body" autoComplete="on" className="bodyInput" /> */}
                        <textarea rows={10} placeholder="body (NOTE: REMEMBER PUNCTUATION AND SPACES!)" name="body"
                            autoComplete="on"
                            className="bodyInput"
                            onChange={this.handleChange}
                            value={this.state.body}
                        >
                        </textarea>
                    </div>
                    <button>SUBMIT</button>
                </form>
            </div>     
        )
    }
}

export default CommentFormModal

