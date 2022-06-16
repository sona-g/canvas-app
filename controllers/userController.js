const express = require('express');
const user = express.Router();

//routes
//seed
user.get('/', (req, res) => {
	res.send('this is the /user index');
});

module.exports = user;
