const 
    Stories = require('../controllers/storiesCtrl'),//Access to methods in controller
    Comments = require('../controllers/commentsCtrl'),
    express = require('express'),
    router = express.Router(),
    {verifyToken} = require('../serverAuth');

// Stories
router.get('/', Stories.index)//goes to Stories controller and accesses method called index
router.get('/:id', Stories.show)//goes to Stories controller and accesses method called show
router.use(verifyToken)
router.post('/:id/likes', Stories.like)
router.post('/:id', Stories.update)//goes to Stories controller and accesses method called update
router.post('/', Stories.new) //goes to Stories controller and accesses method called new
router.patch('/:id', Stories.update)//goes to Stories controller and accesses method called update
router.delete('/:id', Stories.destroy)//goes to Stories controller and accesses method called destroy
// Comments
router.post('/:id/comments/:commentid/likes', Comments.like)
// router.post('/:id/comments/:commentid', Comments.update)//goes to Comments controller and accesses method called update
router.post('/:id/comments', Comments.new) //goes to Comments controller and accesses method called new
// router.patch('/:id/comments/:commentid', Comments.update)//goes to Comments controller and accesses method called update
// router.delete('/:id/comments/:commentid', Comments.destroy)//goes to Comments controller and accesses method called destroy
    

module.exports = router;