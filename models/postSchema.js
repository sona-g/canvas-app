const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: { type: String, required: true },
	image: String,
	ownerOfPost: { type: Schema.Types.ObjectId, ref: 'User'},
	commentsArray: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: []}],
	usersLikedList: [{ type: Schema.Types.ObjectId, ref: 'User' , default: []}],
});

postSchema.virtual('numOfLikes').get(function () {return this.usersLikedList.length});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
