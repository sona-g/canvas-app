const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
	res.send('test');
});

app.listen(port, () => {
	console.log(`express listening on port ${port}`);
});
