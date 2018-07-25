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
                res.json({status: "SUCCESS", payload: comment})
            })
        } else {
            res.json({status: "ERROR", payload: null, message: "ALREADY LIKED"})
        }
    })
}