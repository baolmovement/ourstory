import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import httpClient from '../httpClient'

class LogOut extends Component {
    componentDidMount() {
        httpClient.logOut()
        this.props.onLogOutSuccess()
        console.log("Logging out...")
    }
    render() {
        return <Redirect to='/' />
    }
}

export default LogOut