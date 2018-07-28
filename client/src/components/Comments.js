import React from 'react'

const Comments = (props) => {
    // if(!this.props.comments)return(<h1>Loading Comments...</h1>)
    return (
        <div className="Home">
            <h1>COMMENTS</h1>
            <ul>
                {props.comments.map((c, i) => {
                return (
                    <li key={i}>
                        <p>{c.description}</p> 
                        <p>{c.body}</p>
                        <p>{c.likes.length} likes</p> 
                        {props.checkIfLiked(c)}
                        {props.currentUser._id===c._by
                        ?
                        <button data-id={c._id} onClick={props.deleteComment}>DELETE</button>
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

export default Comments