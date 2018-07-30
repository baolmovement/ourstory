const 
	User = require('../models/User.js'),
    Story = require('../models/Story.js'),
    {signToken} = require('../serverAuth.js')


module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: users})
		})
	},

	// get one user
	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			Story.find({_by: req.params.id}, (err, stories)=>{
				if(err) return res.json({message: "ERROR"})
				res.json({ message: "SUCCESS", payload: {user, stories} })
			})	
		})
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			const token = signToken(user)
			res.json({ message: "SUCCESS", payload: token })
		})
	},

	// update an existing user
	update: (req, res) => {
		console.log(req.body)
        if(!req.body.password) delete req.body.password
		Object.assign(req.user, req.body)
		req.user.save((err, updatedUser) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			const token = signToken(updatedUser)
			res.json({ message: "SUCCESS", payload: token, user: updatedUser })
		})
      },

	// delete an  user
	destroy: (req, res) => {
		let { id } = req.params;
        User.findByIdAndRemove(id, (err, deletedUser) => {
            if (err)return res.json({message: "ERROR"})
            else {
                res.json({ message: "SUCCESS", payload: deletedUser })
            }
        })
	},
    //Checks to see if provided inputs matches any users in DB(if successful, a token is assigned)
    authenticate: (req, res) => {
		User.findOne({email: req.body.email}, (err, user) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			if(!user || !user.validPassword(req.body.password)) {
				return res.json({message: "ERROR", payload: null, error: "Invalid credentials"})
			}
			const token = signToken(user)
			res.json({message: "SUCCESS", payload: token})
		})
	}
}