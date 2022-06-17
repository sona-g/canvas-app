const express = require('express');
const posts = express.Router();
const Post = require('../models/postSchema');

//routes

//seed
posts.get('/seed', async (req, res) => {
	try {
		const newPost = await Post.create([
			{
				objectId: 1,
				title: 'I love Italy',
				description: 'Italy is my life. I love Italy more than my wife. Fuyoh',
				image:
					'https://nehraconsultancy.com/wp-content/uploads/2020/12/amalfi-italy-shutterstock_759048709_bdda191300.jpg',
				numOfLikes: 3,
				ownerOfPost: 'Brandon Yeo',
				commentsArray: [{ QingYun: 'Woah nice!' }, { Sonakshi: 'Wowow' }],
				private: false,
				usersLikedList: ['QingYun', 'Sonakshi'],
			},
		]);
		res.send(newPost);
	} catch (error) {
		console.log(error);
	}
});

//index - get (display a list of all the posts)
posts.get('/', (req, res) => {
	res.send('this is the /posts index');
});

//new - get (show form to make new post)
posts.get('/new', (req, res) => {
	res.send('this is the new post form');
});

//create - post (add new blog to database, then redirect)
posts.post('/', (req, res) => {
	res.send('add new post');
});

//show - get (show info about 1 particular post)
posts.get('/:id', (req, res) => {
	res.send('show 1 post');
});

//edit - get (show edit form for 1 post)
posts.get('/:id/edit', (req, res) => {
	res.send('show edit form of 1 post');
});

//update - put (update a particular post, then redirect)
posts.put('/:id', (req, res) => {
	res.send('update the post, then redirect');
});

//destroy - delete (delete a post then redirect)
posts.delete('/:id', (req, res) => {
	res.send('delete');
});

module.exports = posts;
