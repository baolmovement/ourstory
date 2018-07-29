import React from 'react'

const Like = (props) => {
    let { handleSubmit } = props;
    return( 
        <div>
            <form onSubmit={handleSubmit}>
                <button> LIKE </button>
            </form>
        </div>
    )
}

export default Like