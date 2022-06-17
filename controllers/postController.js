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
posts.get('/', async (req, res) => {
	try {
		const allPosts = await Post.find({});
		res.send(allPosts);
	} catch (error) {
		res.send(error);
	}
});

//new - get (show form to make new post)
posts.get('/new', async (req, res) => {
	res.send('NEW POST FORM GOES HERE');
});

//create - post (add new blog to database, then redirect)
posts.post('/', async (req, res) => {
	try {
		const newPost = await Post.create(req.body);
		res.send(newPost);
	} catch (error) {
		res.send(error);
	}
});

//show - get (show info about 1 particular post)
posts.get('/:id', async (req, res) => {
	try {
		const selectedPost = await Post.findById(req.params.id);
		res.send(selectedPost);
	} catch (error) {
		res.send(error);
	}
});

//edit - get (show edit form for 1 post)
posts.get('/:id/edit', (req, res) => {
	res.send('show edit form of 1 post');
});

//update - put (update a particular post, then redirect)
posts.put('/:id', async (req, res) => {
	try {
		const updatePost = await Post.findByIdAndUpdate(req.params.id);
		res.send(updatePost);
	} catch (error) {
		res.send(error);
	}
});

//destroy - delete (delete a post then redirect)
posts.delete('/:id', async (req, res) => {
	try {
		const removePost = await Post.findByIdAndDelete(req.params.id);
		res.send(removePost);
	} catch (error) {
		res.send(error);
	}
});

module.exports = posts;
