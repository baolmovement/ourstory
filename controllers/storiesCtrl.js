const Story = require('../models/Story.js');

exports.index = (req, res) => {
    Story.find({}, (err, Story) => {
        if(err){
            res.json({status: "FAIL", err})
        } else {
            res.json({status: "SUCCESS", payload: Story})
        }
    }) 
};

exports.new = (req, res) => {
    Story.create(req.body, (err, newStory) => {
        if(err){
            res.json({status: "FAIL", err});
        } else {
            res.json({status: "SUCCESS", payload: newStory })
        }
    })
}

exports.show = (req,res) => {
    Story.findById(req.params.id, (err, Story) =>{
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