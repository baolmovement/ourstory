import React from 'react'

const StoryForm = (props) => {
    let { handleChange, handleSubmit, title, description, body } = props;
    return( 
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="title" placeholder="title" value={title}/>
                <div><input onChange={handleChange} type="text" name="description" placeholder="description" value={description}/></div>
                <div><input onChange={handleChange} type="text" name="body" placeholder="body" value={body} className="bodyInput"/></div>
                <button> SUBMIT </button>
            </form>
        </div>
    )
}

export default StoryForm