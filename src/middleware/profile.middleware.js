module.exports = (req, res, next) => {

	if (req.method === 'OPTIONS') {
		return next;
	}

	try {

		for (let item in req.body) {

			if (req.body[item].length === 0) {
				delete req.body[item]
			}

		}

		next();

	} catch (e) {
		res.status(401).json({ message: 'Нет авторизации' })
	}

}