const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
	id: { type: Number, required: true },
	postId: { type: Number, required: true },
	ownerOfComment: { type: String, required: true },
	commentText: { type: String },
	noOfLikes: { type: Number, required: true },
	usersLikedList: { type: Array, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;