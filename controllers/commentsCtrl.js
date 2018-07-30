const Story = require('../models/Story')
const Comment = require('../models/Comment.js');

//Retrieves all comments by a specified author in comments DB
exports.index = (req, res) => {
    Comment.find({storyid: req.params.id}, (err, comments) => {
        if(err){
            res.json({status: "FAIL", err})
        } else {
            res.json({status: "SUCCESS", payload: comments})
        }
    }) 
};

//Just for testing
exports.show = (req, res) => {
    Comment.findById(req.params.commentid, (err, comment) =>{
        if(err){
            res.json({status: "Fail", err})
        } else {
            res.json({status: "Success", payload: comment})
        }
    })
}

//Creates a new comment in the specified story's comments field
exports.new = (req, res) => {
    console.log(req.params)
    Comment.create({ ...req.body, _by: req.user, _story: req.params.id}, (err, newComment) => {
        if(err){
            return res.json({status: "FAIL", err});
        } else {
            Story.findById(req.params.id, (err, story) => {
                if(err) return res.json({status: "FAIL", err});
                story.comments.push(newComment)
                story.save((err, updatedStory) => {
                    if(err) return res.json({status: "FAIL", err});
                    res.json({status: "SUCCESS", payload: newComment })
                })
            })
        }
    })
}

//Finds a comment by ID and pushes current user's ID to its 'likes' array field
exports.like = (req, res) => {
    Comment.findById(req.params.commentid, (err, comment) => {
        console.log(comment)
        if(err) return console.log(err);
        const alreadyLiked = !!(comment.likes.find((l) => {
            return l.userId.equals(req.user._id)
        }))
        console.log(alreadyLiked);
        if(!alreadyLiked){
            comment.likes.push({userId: req.user._id})
            comment.save((err) => {
                if(err)return console.log(err, comment)
                // if comment likes reaches threshold, move it to story's "accepted" list:
                Story.findById(comment._story, (err, story) => {
                    if(comment.likes.length >= 2) {
                        // empty story comments, but add this comment to accepted comments:
                        story.comments = []
                        story.acceptedComments.push(comment)
                        story.save((err, story) => {
                            res.json({status: "SUCCESS", payload: story})
                        })
                    } else {
                        res.json({status: "SUCCESS", payload: story})
                    }
                })
            })
        } else {
            res.json({status: "ERROR", payload: null, message: "ALREADY LIKED"})
        }
    })
}

//Finds a specified comment by ID and deletes it from the story's comments array field
exports.destroy = (req,res) => {
    Comment.findByIdAndRemove(req.params.commentid, (err, deletedComment) => {
        if(err) return console.log(err);
        res.json({status: "DELETED", payload: deletedComment})
    })
}
//Finds specified comment by ID and updates its 'likes' field array without the current user object
exports.unlike = (req,res) => {
    Comment.findById(req.params.commentid, (err, comment) => {
        if(err) return console.log(err);
        let { _id } = req.user;
        comment.likes = comment.likes.filter(l => { 
            !l.userId.equals(_id)
            });

        comment.save((err, commment) => {
            if(err)return console.log(err)
            Story.findById(comment._story, (err, story) => {
                res.json({ status: "SUCCESS", payload: story })
            })

    })
       
})
}