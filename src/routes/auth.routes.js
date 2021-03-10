const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Users = require('../models/User');
const Profile = require('../models/Profile');

const router = Router();

router.post(
	'/register',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
	],
	async (req, res) => {

	try {		
		const errors = validationResult(req);
		
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Введены некорректные данные при регистрации'
			});
		}

		const { email, password } = req.body;

		const person = await Users.findOne({ email });

		if (person) {
			return res.status(400).json({ message: 'Пользователь с таким именем уже есть' });
		}

		const hashPass = await bcrypt.hash(password, 12);
		const user = new Users({ email, password: hashPass });
		const userProfile = new Profile({
			name: '',
			lastName: '',
			email: email,
			imageName: '',
			imagePath: '',
			path: '',
			owner: user.id
		});

		await user.save();
		await userProfile.save();

		res.status(201).json({ message: 'Пользователь создан' });

	} catch(e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}
});

router.post(
	'/login',
	[
		check('email', 'Некорректный email').normalizeEmail().isEmail(),
		check('password', 'Введите пароль').exists()
	],
	async (req, res) => {
	try {
		const errors = validationResult(req);

		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Не верный логин/пароль'
			});
		}

		const { email, password } = req.body;

		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Не верный логин/пароль' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: 'Не верный логин/пароль' });
		}

		const token = jwt.sign(
			{ userId: user.id },
			config.get('jwt'),
			{ expiresIn: '1h' }
		);

		res.json({ token, userId: user.id });

	} catch(e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}
});

module.exports = router;