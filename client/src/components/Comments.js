import React from 'react'

const Comments = (props) => {
    // if(!this.props.comments)return(<h1>Loading Comments...</h1>)
    return (
        <div className="Home">
            <h1>ADLIBS:</h1>
          
                {props.comments.map((c, i) => {
                return (
                    <p key={i}>
                        <div className="commentInfo"> <strong>DESCRIPTION:</strong> <span> {c.description}</span> </div>
                        <div className="commentInfo"><strong>BODY:</strong> <span>{c.body}</span></div>
                        <p>{c.likes.length} likes</p> 
                        {props.checkIfLiked(c)}
                        {props.currentUser._id===c._by
                        ?
                        <button data-id={c._id} onClick={props.deleteComment}>DELETE</button>
                        :
                        null
                        } 
                    </p>
                )
                })}
            
        </div>
    )
}

export default Comments