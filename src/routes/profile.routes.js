const { Router } = require('express');
const multer  = require("multer");

const uuid = require('uuid');
const fs = require('fs');

const router = Router();

const Profile = require('../models/Profile');
const Users = require('../models/User');
const Tasks = require('../models/Tasks');

const auth = require('../middleware/auth.middleware');
const profile = require('../middleware/profile.middleware');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "client/public/uploads/");
    },
    filename: (req, file, cb) =>{
    		const extension = file.mimetype.split('/');
        cb(null, uuid.v4() + '.' + extension[1]);
    }
});

const fileFilter = (req, file, cb) => {
  
  if(file.mimetype === "image/png" || 
  file.mimetype === "image/jpg"|| 
  file.mimetype === "image/jpeg"){
      cb(null, true);
  }
  else{
      cb(null, false);
  }
};


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
			email: data.email,
			imageName: data.imageName,
			imagePath: data.imageName
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
			email: data.email,
			imageName: data.imageName,
			imagePath: data.imagePath,
			path: data.path
		});

	} catch(e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

})

router.put('/upload', 
	auth, 
	multer({storage:storageConfig, fileFilter: fileFilter}).single('file'), 
	async (req, res) => {

	const imageFile = req.file;	

	if (!imageFile) {
    return res.json({error: true});
	}

  if (imageFile) {
  	const absolutePath = imageFile.path.split('\\').join('/');

		await Profile.updateOne(
			{ owner: req.user.userId },
			{
				imageName: imageFile.filename,
				imagePath: 'uploads/' + imageFile.filename,
				path: absolutePath
			}
		);

		return res.json({path: 'uploads/' + imageFile.filename});
	}

	res.json(null);
})

router.put('/deleteImage', auth, async (req, res) => {

	const data = await Profile.findOne({ owner: req.user.userId });

	await Profile.updateOne(
		{ owner: req.user.userId },
		{
			imageName: '',
			imagePath: '',
			path: ''
		}
	);

	try {
	  fs.unlinkSync(data.path)
	} catch(err) {
	  console.error(err)
	}

	res.json({message: 'ok'});
});

router.delete('/delete', auth, async (req, res) => {

	try {

		await Users.deleteOne({ _id: req.user.userId });
		await Profile.deleteOne({ owner: req.user.userId });
		await Tasks.deleteMany({ owner: req.user.userId });

		return res.json({ message: 'Пользователь удален' })
	} catch(e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

		res.json(null);
});

module.exports = router;