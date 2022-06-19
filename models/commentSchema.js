const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
	//Comment postId linked to the objectId of post
	//that the comment is meant to fall under
	postId: { type: Number, required: true },
	ownerOfComment: { type: String, required: true },
	commentText: String,
	numOfLikes: Number,
	usersLikedList: { type: Array, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
