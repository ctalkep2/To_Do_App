const { Router } = require('express');
const router = Router();

const Tasks = require('../models/Tasks')

const auth = require('../middleware/auth.middleware');

router.put('/change', auth, async (req, res) => {
	
	try {

		const data = await Tasks.find({ owner: req.user.userId });

		data.sort((prev, next) => prev.priority - next.priority);

		const findDataIndex = data.findIndex((element, index) => {
			return element._id.toString() === req.body.id;
		});

		if (req.body.command === 'UP') {
			if (findDataIndex === 0) return res.json(null);

			let tmp = data[findDataIndex - 1].priority;
			data[findDataIndex - 1].priority = data[findDataIndex].priority;
			data[findDataIndex].priority = tmp;

			data.forEach(async (elem, index) => {
				await Tasks.updateOne({ _id: elem._id }, elem);
			});

			return res.json(data.sort((prev, next) => prev.priority - next.priority));
		} 

		if (req.body.command === 'DOWN') {
			if (findDataIndex === data.length - 1) return res.json(null);

			let tmp = data[findDataIndex + 1].priority;
			data[findDataIndex + 1].priority = data[findDataIndex].priority;
			data[findDataIndex].priority = tmp;

			data.forEach(async (elem, index) => {
				await Tasks.updateOne({ _id: elem._id }, elem);
			});

			return res.json(data.sort((prev, next) => prev.priority - next.priority));
		}

		if (req.body.command === 'COMPLITED') {

			if (data[findDataIndex].complited) {
				data[findDataIndex].complited = false
			} else {
				data[findDataIndex].complited = true 
			}

			data.forEach(async (elem, index) => {
				await Tasks.updateOne({ _id: elem._id }, elem);
			});

			return res.json(data.sort((prev, next) => prev.priority - next.priority));
		}

		res.json(null);

	} catch (e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

});

router.post('/create', auth, async (req, res) => {
	
	try {

		const task = new Tasks({
			task: req.body[req.body.length - 1].task,
			complited: false,
			owner: req.user.userId,
			priority: req.body[req.body.length - 1].priority,
			date: Date.now()
		});

		await task.save();

		const data = await Tasks.findOne({ _id: task._id })

		res.json(data);

	} catch (e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

});

router.get('/', auth, async (req, res) => {
	
	try {

		const data = await Tasks.find({ owner: req.user.userId });

		data.sort((prev, next) => prev.priority - next.priority);

		res.json(data);

	} catch (e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

});

router.delete('/delete', auth, async (req, res) => {
	
	try {

		await Tasks.deleteOne({ _id: req.body.id })

		const allTasks = await Tasks.find({ owner: req.user.userId });
		
		allTasks
			.sort((prev, next) => prev.priority - next.priority)
			.map((item, index) => {
				item.priority = ++index;
			});

		allTasks.forEach(async (elem, index) => {
			await Tasks.updateOne({ _id: elem._id }, elem);
		});

		res.json(allTasks);

	} catch (e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то не так' });
	}

});

module.exports = router;