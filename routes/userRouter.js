const
	express = require('express'),
	userRouter = new express.Router(),
    usersCtrl = require('../controllers/usersCtrl.js'),
	{verifyToken} = require('../serverAuth');
    
userRouter.get('/', usersCtrl.index)//goes to Users controller and accesses method called index
userRouter.post('/', usersCtrl.create)//goes to Users controller and accesses method called post
userRouter.post('/authenticate', usersCtrl.authenticate)//goes to Users controller and accesses method called authenticate
userRouter.use(verifyToken) //anything below this requires a token to access
userRouter.get('/:id', usersCtrl.show)//goes to Users controller and accesses method called show
userRouter.patch('/me', usersCtrl.update)//goes to Users controller and accesses method called update
userRouter.delete('/:id', usersCtrl.destroy)//goes to Users controller and accesses method called destroy

module.exports = userRouter