const Story = require('../models/Story.js');

//Retrieves all stories in story DB
exports.index = (req, res) => {
    Story.find({}).populate('_by').exec((err, Story) => {
        if(err){
            res.json({status: "FAIL", err})
        } else {
            res.json({status: "SUCCESS", payload: Story})
        }
    }) 
};

//Creates a new story
exports.new = (req, res) => {
    Story.create({ ...req.body, _by: req.user}, (err, newStory) => {
        if(err){
            res.json({status: "FAIL", err});
        } else {
            res.json({status: "SUCCESS", payload: newStory })
        }
    })
}

//Retrieves a single story by it's ID
exports.show = (req,res) => {
    Story.findById(req.params.id, (err, Story) =>{
        if(err){
            res.json({status: "Fail", err})
        } else {
            res.json({status: "Success", payload: Story})
        }
    })
}

//Retrieves a single story by ID and re-enters data with req.body
exports.update = (req,res) => {
    Story.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedStory) => {
        if(err) return console.log(err);
        res.json({status: "Success", payload: updatedStory})
    })
}

//Retrieves a single story by ID and deletes it from story DB
exports.destroy = (req,res) => {
    Story.findByIdAndRemove(req.params.id, (err, deletedStory) => {
        if(err) return console.log(err);
        res.json({status: "DELETED", payload: deletedStory})
    })
}

//Retrieves a single story by id and updates its 'likes' field by pushing a new user object.
exports.like = (req, res) => {
    Story.findById(req.params.id, (err, story) => {
        if(err) return console.log(err);
        const alreadyLiked = !!(story.likes.find((l) => {
            return l.userId.equals(req.user._id)
        }))
        // console.log(alreadyLiked);
        if(!alreadyLiked){
            story.likes.push({userId: req.user._id})
            story.save((err) => {
                if(err)return console.log(err, story)
                console.log(story)
                res.json({status: "SUCCESS", payload: story})
            })
        } else {
            res.json({status: "ERROR", payload: null, message: "ALREADY LIKED"})
        }
    })
}

//Retrieves a single story by id and updates its 'likes' field with new array, minus a like with same user ID as current user.
exports.unlike = (req,res) => {
    Story.findById(req.params.id, (err, story) => {
        if(err) return console.log("banana");
        console.log(req.user._id)
        console.log(story.likes)
        console.log(story.likes.filter(l => { 
            !l.userId.equals(req.user._id)
            }))
        console.log(story.likes.filter(l => !l.userId.equals(req.user._id)
            ))
       
        let { _id } = req.user;
        story.likes = story.likes.filter(l =>  
            !l.userId.equals(_id)
        );

        story.save((err) => {
            if(err)return console.log(err, story)
            res.json({ status: "SUCCESS", payload: story })

        })
       
    })
}

