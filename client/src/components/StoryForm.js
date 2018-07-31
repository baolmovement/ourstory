import React from 'react'

const StoryForm = (props) => {
    let { handleChange, handleSubmit, title, description, body } = props;
    return( 
        <div>
            <form onSubmit={handleSubmit} >
                <input onChange={handleChange} type="text" name="title" placeholder="title" value={title}/>
                <div><input onChange={handleChange} type="text" name="description" placeholder="description" value={description}/></div>
                {/* <div><input onChange={handleChange} type="text" name="body" placeholder="body" value={body} className="bodyInput"/></div> */}
                <div><textarea rows={10} placeholder="body" name="body" 
                        autoComplete="on"
                        className="bodyInput"
                        onChange={props.handleChange}
                        value={props.body}
                    >
                </textarea></div>
                <button> SUBMIT </button>
            </form>
        </div>
    )
}

export default StoryForm
//