const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');

//controllers
const user = require('./controllers/userController');
const posts = require('./controllers/postController');
const comment = require('./controllers/commentController');

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
});
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user', user);
app.use('/api/posts', posts);
app.use('/api/comment', comment);

app.get('/', (req, res) => {
	res.send('test');
});

app.listen(port, () => {
	console.log(`express listening on port ${port}`);
});
