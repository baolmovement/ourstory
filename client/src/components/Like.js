import React from 'react'

const Like = (props) => {
    let { handleSubmit, currentUser } = props;
    return( 
        <div>
            <form onSubmit={handleSubmit} currentUser={currentUser}>
                <button> Like </button>
            </form>
        </div>
    )
}

export default Like