require('dotenv').config();

const 
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    userRouter = require('./routes/userRouter.js'),
    storyRouter = require('./routes/storyRouter.js'), 
    commentRouter = require('./routes/storyRouter.js'), 
    PORT = 3001;  

//DB CONNECTION 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
    console.log(err || "Connected!")
} )

//MIDDLEWARE
app.use(logger('dev'));
app.use(express.json()) //Bodyparser -- interpretting data from DB

//ROUTER
app.use('/api/users', userRouter) //Express using routes from a seperate file called usersRouter.js
app.use('/api/stories', storyRouter) //Express using routes from a seperate file called storyRouter.js
app.use('api/stories/:id/comments', commentRouter) //Express using routes from a seperate file called commentRouter.js

//BACKEND PORT
app.listen(PORT, (err) => {
    console.log(err || `Served on ${PORT}`)
})
