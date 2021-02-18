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

		if (req.body.command === 'EDIT') {

			data.forEach(async (elem, index) => {

				if (req.body.id === elem._id.toString()) {
					await Tasks.updateOne({ _id: elem._id }, req.body.task);
				}

			});

			return res.status(201).json({ message: 'Changes saved' });
		}

		if (req.body.command === 'DROP') {
			const dataTasks = req.body.tasks;

			dataTasks.forEach(async (elem, index) => {
				await Tasks.updateOne({ _id: elem._id }, elem);
			});
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