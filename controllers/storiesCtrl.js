const Story = require('../models/Story.js');

exports.index = (req, res) => {
    Story.find({}).populate('_by').exec((err, Story) => {
        if(err){
            res.json({status: "FAIL", err})
        } else {
            res.json({status: "SUCCESS", payload: Story})
        }
    }) 
};

exports.new = (req, res) => {
    Story.create({ ...req.body, _by: req.user}, (err, newStory) => {
        if(err){
            res.json({status: "FAIL", err});
        } else {
            res.json({status: "SUCCESS", payload: newStory })
        }
    })
}

exports.show = (req,res) => {
    Story.findById(req.params.id).populate('comments').exec((err, Story) =>{
        if(err){
            res.json({status: "Fail", err})
        } else {
            res.json({status: "Success", payload: Story})
        }
    })
}

exports.update = (req,res) => {
    Story.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedStory) => {
        if(err) return console.log(err);
        res.json({status: "Success", payload: updatedStory})
    })
}

exports.destroy = (req,res) => {
    Story.findByIdAndRemove(req.params.id, (err, deletedStory) => {
        if(err) return console.log(err);
        res.json({status: "DELETED", payload: deletedStory})
    })
}

exports.like = (req, res) => {
    Story.findById(req.params.id, (err, story) => {
        if(err) return console.log(err);
        const alreadyLiked = !!(story.likes.find((l) => {
            return l.userId.equals(req.user._id)
        }))
        console.log(alreadyLiked);
        if(!alreadyLiked){
            story.likes.push({userId: req.user._id})
            story.save((err) => {
                if(err)return console.log(err, story)
                res.json({status: "SUCCESS", payload: story})
            })
        } else {
            res.json({status: "ERROR", payload: null, message: "ALREADY LIKED"})
        }
    })
}