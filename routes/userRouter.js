const
	express = require('express'),
	userRouter = new express.Router(),
    usersCtrl = require('../controllers/usersCtrl.js'),
	{verifyToken} = require('../serverAuth');
    
userRouter.get('/', usersCtrl.index)
userRouter.post('/', usersCtrl.create)
userRouter.post('/authenticate', usersCtrl.authenticate)
userRouter.use(verifyToken)
userRouter.get('/:id', usersCtrl.show)
userRouter.patch('/me', usersCtrl.update)
userRouter.delete('/:id', usersCtrl.destroy)

module.exports = userRouter