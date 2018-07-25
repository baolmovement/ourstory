import axios from 'axios';
import jwtDecode from 'jwt-decode'

const httpClient = axios.create() 

httpClient.getToken = () => {
    return localStorage.getItem('token')
}

httpClient.setToken = (token) => {
    //set key called token with value of token
    localStorage.setItem('token', token)
    return token
}

httpClient.getCurrentUser = function(){
    const token = this.getToken()
    if(token) return jwtDecode(token)
    return null
}

httpClient.signUp = function(userInfo) {
    //returns a promise, able to 
    return this({method: 'post', url: '/api/users', data: userInfo})
        .then((serverResponse) => {
            if(serverResponse.data.message === "SUCCESS") {
                //if successful establish what the token is
                const token = serverResponse.data.payload
                //saves token to local library and to send token to header
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else {
                return false
            }
        })
}

httpClient.logIn = function(credentials) {
    return this({method: 'post', url: '/api/users/authenticate', data: credentials})
        .then((serverResponse) => {
            if(serverResponse.data.message === "SUCCESS") {
                //if successful establish what the token is
                const token = serverResponse.data.payload
                //saves token to local library and to send token to header
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else {
                return false
            }
     })
}
httpClient.logOut = function() {
    //clears token from storage
    localStorage.clear()
    //clears token from header
    delete httpClient.defaults.headers.common.token
    return true
}

httpClient.updateProfile = function(userInfo) {
    //returns a promise, able to 
    return this({method: 'patch', url: `/api/users/me`, data: userInfo})
        .then((serverResponse) => {
            if(serverResponse.data.message === "SUCCESS") {
                //if successful establish what the token is
                const token = serverResponse.data.payload
                //saves token to local library and to send token to header
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else {
                return false
            }
        })
}

//send request with token in header
httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient