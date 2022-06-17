const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
	objectId: { type: Number, required: true },
	title: {
		type: String,
		required: true,
	},
	Description: { type: String, required: true },
	image: String,
	numOfLikes: Number,
	ownerOfPost: { type: String },
	commentsArray: { type: Array },
	private: { type: Boolean },
	usersLikedList: { type: Array },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
