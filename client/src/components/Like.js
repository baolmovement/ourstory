import React from 'react'

const Like = (props) => {
    let { handleSubmit } = props;
    return( 
        <div>
            <form onSubmit={handleSubmit}>
                <button> Like </button>
            </form>
        </div>
    )
}

export default Like