const { Router } = require('express');
const router = Router();
const Profile = require('../models/Profile');
const Users = require('../models/User')
const auth = require('../middleware/auth.middleware');
const profile = require('../middleware/profile.middleware');

router.post('/change', 
	auth,
	profile,
	async (req, res) => {

	try {

		await Profile.updateOne(
			{ owner: req.user.userId },
			req.body
		);

		const data = await Profile.findOne({ owner: req.user.userId });

		res.json({
			name: data.name,
			lastName: data.lastName,
			email: data.email
		});

	} catch(e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

})

router.get('/', auth, async (req, res) => {

	try {

		const data = await Profile.findOne({ owner: req.user.userId });

		res.json({
			name: data.name,
			lastName: data.lastName,
			email: data.email
		});

	} catch(e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

})

router.delete('/delete', auth, async (req, res) => {

	try {

		await Users.deleteOne({ _id: req.user.userId });
		await Profile.deleteOne({ owner: req.user.userId });

	} catch(e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

});

module.exports = router;