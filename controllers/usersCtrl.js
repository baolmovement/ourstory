const 
	User = require('../models/User.js'),
	Story = require('../models/Story.js')


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
			if(err) return res.json({message: "ERROR"})
			res.json({ message: "SUCCESS", payload: user })
		})
	},

	// update an existing user
	update: (req, res) => {
        let { id } = req.params
        User.findByIdAndUpdate(id, { $set: req.body }, {new: true }, (err, userFromDB) => {
          if (err) {
            res.redirect('api/users')
          } else {
            res.json({status: "SUCCESS", payload: userFromDB })
          }
        })
      },

	// delete an  user
	destroy: (req, res) => {
		let { id } = req.params;
        User.findByIdAndRemove(id, (err, deletedUser) => {
            if (err)return res.json({message: "ERROR"})
            else {
                res.redirect('api/users');
                res.json({ message: "SUCCESS", payload: deletedUser })
            }
        })
	}
}