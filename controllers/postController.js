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
				title: 'I love siambu',
				description: 'Siambu for wife, Siambu for life',
				image:
					'https://nehraconsultancy.com/wp-content/uploads/2020/12/amalfi-italy-shutterstock_759048709_bdda191300.jpg',
				ownerOfPost: '62b01665c2e0e54058b6c492',
				// comments: [
				// 	{ '62b01665c2e0e54058b6c490': 'Woah nice!' },
				// 	{ '62b01665c2e0e54058b6c491': 'Wowow' },
				// ],
				usersLikedList: [
					'62b01665c2e0e54058b6c490',
					'62b01665c2e0e54058b6c491',
				],
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
		const allPosts = await Post.find({})
			.populate('ownerOfPost')
			.populate('usersLikedList');
		res
			.status(StatusCodes.ACCEPTED)
			.send({ status: 'success', data: allPosts });
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

//create - post (add new post to database, then redirect)
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
