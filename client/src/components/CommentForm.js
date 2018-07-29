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
        e.target.value = null
    }
    
    render(){
        return ( 
            <div className="CommentForm">
                <form
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                >
                    <input type="text" placeholder="description" name="description" autoComplete="off" className="descriptionInput" />
                    <div className="bodyContainer"><input type="text" placeholder="body" name="body" autoComplete="on" className="bodyInput" /></div>
                    <button>SUBMIT</button>
                </form>
            </div>     
        )
    }
}

export default CommentFormModal

