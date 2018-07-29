import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const NavBar = (props) => {
    return (
        <div className="NavBar"> 
            <div className="Logo"><h1>QUILT</h1></div>
            <Link to="/" className="navbarItem">Home</Link>  
            {props.currentUser
                ? (
                    <Fragment>
                        <Link to="/logout" className="navbarItem">Log Out</Link>
                        <Link to="/profile" className="navbarItem"> Logged in as: {props.currentUser.name} </Link>
                        <Link to="/post" className="navbarItem"> Post </Link>
                    </Fragment>
                )
                : (
                    <Fragment>
                        <Link to="/signup" className="navbarItem">Sign Up</Link>
                        <Link to="/login" className="navbarItem">Log In</Link>
                    </Fragment>
                )
            }
        </div>
    )
}

export default NavBar