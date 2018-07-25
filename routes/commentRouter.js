const 
    Comments = require('../controllers/commentsCtrl'),//Access to methods in controller
    express = require('express'),
    router = express.Router(),
    {verifyToken} = require('../serverAuth');

router.get('/:id', Comments.show)//goes to Comments controller and accesses method called show
router.use(verifyToken)
router.post('/:id/likes', Comments.like)
router.post('/:id', Comments.update)//goes to Comments controller and accesses method called update
router.post('/', Comments.new) //goes to Comments controller and accesses method called new
router.patch('/:id', Comments.update)//goes to Comments controller and accesses method called update
router.delete('/:id', Comments.destroy)//goes to Comments controller and accesses method called destroy
    

module.exports = router;