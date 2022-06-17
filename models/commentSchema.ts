import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
	id: { type: Number, required: true },
	postId: { type: Number, required: true },
	ownerOfComment: { type: Number, required: true },
	commentText: { type: String },
	noOfLikes: { type: Number, required: true },
	usersLikedList: { type: Array, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
