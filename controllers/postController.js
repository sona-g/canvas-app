const express = require('express');
const { StatusCodes } = require('http-status-codes');
const posts = express.Router();
const Post = require('../models/postSchema');
const User = require('../models/userSchema');

//routes

//index - get (display a list of all the posts)
posts.get('/', async (req, res) => {
	try {
		const { search } = req.body;
		if (search === undefined) {
			const allPosts = await Post.find({})
				.populate('usersLikedList', 'name')
				.populate('ownerOfPost', 'name');
			res.status(StatusCodes.ACCEPTED).send(allPosts);
		} else {
			const filteredPost = await Post.find({
				$or: [
					{ title: { $regex: search, $options: 'i' } },
					{ description: { $regex: search, $options: 'i' } },
				],
			});
			res.status(StatusCodes.ACCEPTED).send(filteredPost);
		}
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error);
	}
});

//get posts for logged in user
posts.get('/user/:username', async (req, res) => {
	//:username to be removed, to get from session instead.
	try {
		const username = req.params.username;
		const userObj = await User.findOne(
			{ username: username },
			{ listOfFriends: 1 }
		);
		const searchList = [...userObj.listOfFriends, userObj._id];
		const allPosts = await Post.find({ username: { $in: searchList } });
		// console.log(allPosts);
		res.status(StatusCodes.ACCEPTED).send(allPosts);
	} catch (err) {
		console.log(err);
		res.status(StatusCodes.BAD_REQUEST).send(err);
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
