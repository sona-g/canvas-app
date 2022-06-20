const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Comment = require('./commentSchema');

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: { type: String, required: true },
	image: String,
	ownerOfPost: { type: Schema.Types.ObjectId, ref: 'User' },
	// comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	usersLikedList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
