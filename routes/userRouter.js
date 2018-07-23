const
	express = require('express'),
	userRouter = new express.Router(),
    usersCtrl = require('../controllers/usersCtrl.js')
    
userRouter.get('/', usersCtrl.index)
userRouter.post('/', usersCtrl.create)
userRouter.get('/:id', usersCtrl.show)
userRouter.patch('/:id', usersCtrl.update)
userRouter.delete('/:id', usersCtrl.destroy)

module.exports = userRouter