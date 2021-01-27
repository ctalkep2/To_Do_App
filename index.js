const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
// const bodyParser = require('body-parser');

const app = express();

const PORT = 5000 || config.port;

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(express.json({ extended: true }));

app.use('/auth', require('./src/routes/auth.routes'));
app.use('/api/profile', require('./src/routes/profile.routes'));
app.use('/api/tasks', require('./src/routes/tasks.routes'));

// app.get('/', (req, res) => {
// 	res.send('<h1 style="text-align: center; margin-top: 60px;">To do APP</h1>');
// })

const connectConfig = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	retryWrites: false
}

async function startServer() {
	try {
			await mongoose.connect(config.get('dbUri'), connectConfig);

			app.listen(PORT, () => console.log(`App start on PORT: ${PORT}`));
	} catch(error) {
		console.log('Connection error: ', error.message);
		process.exit(1);
	}
}

startServer();