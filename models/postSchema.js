const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: { type: String, required: true },
	image: String,
	numOfLikes: Number,
	ownerOfPost: { type: String, required: true },
	commentsArray: { type: Array },
	private: { type: Boolean, required: true },
	usersLikedList: { type: Array },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
