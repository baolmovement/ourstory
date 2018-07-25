const Comment = require('../models/Comment.js');

exports.new = (req, res) => {
    Comment.create({ ...req.body, _by: req.user}, (err, newComment) => {
        if(err){
            res.json({status: "FAIL", err});
        } else {
            res.json({status: "SUCCESS", payload: newComment })
        }
    })
}

exports.show = (req,res) => {
    Comment.findById(req.params.id, (err, Comment) =>{
        if(err){
            res.json({status: "Fail", err})
        } else {
            res.json({status: "Success", payload: Comment})
        }
    })
}

exports.update = (req,res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedComment) => {
        if(err) return console.log(err);
        res.json({status: "Success", payload: updatedComment})
    })
}

exports.destroy = (req,res) => {
    Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
        if(err) return console.log(err);
        res.json({status: "DELETED", payload: deletedComment})
    })
}

exports.like = (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if(err) return console.log(err);
        const alreadyLiked = !!(comment.likes.find((l) => {
            return l.userId.equals(req.user._id)
        }))
        console.log(alreadyLiked);
        if(!alreadyLiked){
            comment.likes.push({userId: req.user._id})
            comment.save((err) => {
                if(err)return console.log(err, story)
                res.json({status: "SUCCESS", payload: story})
            })
        } else {
            res.json({status: "ERROR", payload: null, message: "ALREADY LIKED"})
        }
    })
}