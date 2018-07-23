const 
    jwt = require('jsonwebtoken'),
    User = require('./models/User.js'),
    {JWT_SECRET} = process.env

function signToken(user) {
    const userData = user.toObject()
    delete userData.password
    return jwt.sign(userData, JWT_SECRET)
}

function verifyToken(req, res, next) {
    //get token from the headers of incoming request
    const token = req.get('token')
    //if no token is provided, deny access
    if(!token) return res.json({message: "ERR" , error: "No token provided"})
    //otherwise, try to verify token
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        //if there's a problem with verification, deny access
        if(err) return res.json({message: "ERR", error: "Invalid token"})
        //otherwise search for user by id embedded in token
        User.findById(decodedData._id, (err, user) => {
            if(!user) return res.json({message: "ERR", error: "Invalid token."})
            //add user to the request object(the current_user)
            req.user = user
            //process route
            next()
        })
    })
   }

module.exports = {
    signToken,
    verifyToken
}


