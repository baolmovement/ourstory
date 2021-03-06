require('dotenv').config();

const 
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    userRouter = require('./routes/userRouter.js'),
    storyRouter = require('./routes/storyRouter.js')

//DB CONNECTION 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
    console.log(err || "Connected!")
} )

//MIDDLEWARE
app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'));
app.use(express.json()) //Bodyparser -- interpretting data from DB

//ROUTER
app.use('/api/users', userRouter) //Express using routes from a seperate file called usersRouter.js
app.use('/api/stories', storyRouter) //Express using routes from a seperate file called storyRouter.js

//BACKEND PORT
app.listen(process.env.PORT, (err) => {
    console.log(err || `Served on ${process.env.PORT}`)
})
