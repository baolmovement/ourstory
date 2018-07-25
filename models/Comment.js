const mongoose = require('mongoose')

likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
  
const commentSchema = new mongoose.Schema({
    description: {type: String, required: true}, 
    body: {type: String, required: true},
    likes: [likeSchema], 
    _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _story: {type: mongoose.Schema.Types.ObjectId, ref: 'Story'}
})  


const Comment = mongoose.model('Comment', commentSchema) 
module.exports = Comment