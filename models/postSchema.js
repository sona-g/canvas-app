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
	ownerOfPost: { type: String },
	commentsArray: { type: Array },
	private: { type: Boolean },
	usersLikedList: { type: Array },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
