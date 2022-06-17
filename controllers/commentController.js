const express = require('express');
const comment = express.Router();
const Comment = require('../models/commentSchema');

//routes

//seed
comment.get('/seed', async (req, res) => {
	try {
		const newComment = await Comment.create([
			{
				id: 1,
				postId: 1,
				ownerOfComment: 'QingYun',
				commentText: 'test123test',
				noOfLikes: 1,
				usersLikedList: ['Brandon Yeo'],
			},
			{
				id: 2,
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
comment.get('/', (req, res) => {
	res.send('this is the /comment index');
});

//new - get (show form to make new comments)
comment.get('/new', (req, res) => {
	res.send('this is the new comment form');
});

//create - post (add new comment to database, then redirect)
comment.post('/', (req, res) => {
	res.send('add new comment');
});

//show - get (show info about 1 particular post)
comment.get('/:id', (req, res) => {
	res.send('show 1 comment');
});

//edit - get (show edit form for 1 post)
comment.get('/:id/edit', (req, res) => {
	res.send('show edit form of 1 comment');
});

//update - put (update a particular post, then redirect)
comment.put('/:id', (req, res) => {
	res.send('update the comment, then redirect');
});

//destroy - delete (delete a comment then redirect)
comment.delete('/:id', (req, res) => {
	res.send('delete comment');
});

module.exports = comment;