const express = require('express');
const { StatusCodes } = require('http-status-codes');
const posts = express.Router();
const Post = require('../models/postSchema');

//routes

//seed
posts.get('/seed', async (req, res) => {
	await Post.deleteMany({});
	try {
		const newPost = await Post.create([
			{
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
		res.status(StatusCodes.CREATED).send({ status: 'success', data: newPost });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error);
	}
});

//index - get (display a list of all the posts)
posts.get('/', async (req, res) => {
	try {
		const allPosts = await Post.find({}).
		populate('usersLikedList','name').
		populate('ownerOfPost','name');
		res.status(StatusCodes.ACCEPTED).send(allPosts);
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error);
	}
});

// Will add in later - for AUTH
// Request + Cookie -> Session -> req.session
// router.get('/:id', async (req, res) => {
// 	if (!req.session.user) {
// 		res.status(StatusCodes.UNAUTHORIZED).send({ status: 'failed' });
// 	} else {
// 		try catch blah blah
// 	}
// });

//new - get (show form to make new post)
posts.get('/new', async (req, res) => {
	res.send('new post form goes here');
});

//create - post (add new blog to database, then redirect)
posts.post('/', async (req, res) => {
	if (req.body.numOfLikes < 0) {
		res.status(StatusCodes.FORBIDDEN).send("Likes can't be negative");
	}
	try {
		const newPost = await Post.create(req.body);
		res.status(StatusCodes.CREATED).send({ status: 'success', data: newPost });
	} catch (error) {
		res.send(error);
	}
});

//show - get (show info about 1 particular post)
posts.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const selectedPost = await Post.findById(id);
		if (selectedPost === null) {
			res
				.status(StatusCodes.NOT_FOUND)
				.send({ status: 'fail', data: 'Post not found' });
		} else {
			res
				.status(StatusCodes.OK)
				.send({ status: 'success', data: selectedPost });
		}
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
	const { id } = req.params;
	if (req.body.numOfLikes < 0) {
		res.status(StatusCodes.FORBIDDEN).send("Likes can't be negative");
	} else {
		try {
			const updatePost = await Post.findByIdAndUpdate(id, req.body);
			if (updatePost === null) {
				res
					.status(StatusCodes.NOT_FOUND)
					.send({ status: 'fail', data: 'Post not found' });
			} else {
				res
					.status(StatusCodes.OK)
					.send({ status: 'success', data: updatePost });
			}
		} catch (error) {
			res.send(error);
		}
	}
});

//destroy - delete (delete a post then redirect)
posts.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deletePost = await Post.findByIdAndDelete(id);
		if (deletePost === null) {
			res
				.status(StatusCodes.NOT_FOUND)
				.send({ status: 'fail', data: 'Post not found' });
		} else {
			res.status(StatusCodes.OK).send({ status: 'success', data: deletePost });
		}
	} catch (error) {
		res.send(error);
	}
});

module.exports = posts;
