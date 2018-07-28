const Story = require('../models/Story')
const Comment = require('../models/Comment.js');


exports.index = (req, res) => {
    Comment.find({storyid: req.params.id}, (err, comments) => {
        if(err){
            res.json({status: "FAIL", err})
        } else {
            res.json({status: "SUCCESS", payload: comments})
        }
    }) 
};

exports.show = (req, res) => {
    Comment.findById(req.params.commentid, (err, comment) =>{
        if(err){
            res.json({status: "Fail", err})
        } else {
            res.json({status: "Success", payload: comment})
        }
    })
}


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
                Story.findById(comment._story)
                    .populate('comments')
                    .populate('acceptedComments')
                    .exec((err, story) => {
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

exports.destroy = (req,res) => {
    Comment.findByIdAndRemove(req.params.commentid, (err, deletedComment) => {
        if(err) return console.log(err);
        res.json({status: "DELETED", payload: deletedComment})
    })
}

exports.unlike = (req,res) => {
    Comment.findById(req.params.commentid, (err, comment) => {
        if(err) return console.log(err);
        let { _id } = req.user;
        comment.likes = comment.likes.filter(l => { 
            !l.userId.equals(_id)
            });

        comment.save((err) => {
            if(err)return console.log(err, comment)
            res.json({ status: "SUCCESS" })

    })
       
})
}