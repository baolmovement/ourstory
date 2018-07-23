const 
    Stories = require('../controllers/storiesCtrl'),//Access to methods in controller
    express = require('express'),
    router = express.Router();

router.get('/', Stories.index)//goes to Stories controller and accesses method called index
router.get('/:id', Stories.show)//goes to Stories controller and accesses method called show
router.post('/:id', Stories.update)//goes to Stories controller and accesses method called update
router.post('/', Stories.new) //goes to Stories controller and accesses method called new
router.patch('/:id', Stories.update)//goes to Stories controller and accesses method called update
router.delete('/:id', Stories.destroy)//goes to Stories controller and accesses method called destroy
    

module.exports = router;