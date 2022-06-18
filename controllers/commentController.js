const express = require('express');
const comment = express.Router();
const Comment = require('../models/commentSchema');

//routes

//seed
comment.get('/seed', async (req, res) => {
	await Comment.deleteMany({});
	try {
		const newComment = await Comment.create([
			{
				postId: 1,
				ownerOfComment: 'QingYun',
				commentText: 'test123test',
				noOfLikes: 1,
				usersLikedList: ['Brandon Yeo'],
			},
			{
				postId: 2,
				ownerOfComment: 'Brandon Yeo',
				commentText: 'PAGGY PAGGY BOI',
				noOfLikes: 100,
				usersLikedList: ['QingYun', 'Sonakshi'],
			},
		]);
		res.send(newComment);
	} catch (error) {
		console.log(error);
	}
});

//index - get (display a list of all the comments)
comment.get('/', async (req, res) => {
	try {
		const allComments = await Comment.find({});
		res.send(allComments);
	} catch (error) {
		res.send(error);
	}
});

//new - get (show form to make new comments)
comment.get('/new', (req, res) => {
	res.send('this is the new comment form');
});

//create - post (add new comment to database, then redirect)
comment.post('/', async (req, res) => {
	try {
		const newComment = await Comment.create(req.body);
		res.send(newComment);
	} catch (error) {
		res.send(error);
	}
});

//show - get (show info about 1 particular post)
comment.get('/:id', async (req, res) => {
	try {
		selectedComment = await Comment.findById(req.params.id);
		res.send(selectedComment);
	} catch (error) {
		res.send(error);
	}
});

//edit - get (show edit form for 1 post)
comment.get('/:id/edit', (req, res) => {
	res.send('show edit form of 1 comment');
});

//update - put (update a particular post, then redirect)
comment.put('/:id', async (req, res) => {
	try {
		const updateComment = await Comment.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		res.send(updateComment);
	} catch (error) {
		res.send(error);
	}
});

//destroy - delete (delete a comment then redirect)
comment.delete('/:id', async (req, res) => {
	try {
		const deleteComment = await Comment.findByIdAndDelete(req.params.id);
		res.send(deleteComment);
	} catch (error) {
		res.send(error);
	}
});

module.exports = comment;
