const mongoose = require('mongoose');
const { commentSchema } = require('./commentSchema');
const { Schema } = mongoose;
// const Comment = require('./commentSchema');

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: { type: String },
	image: String,
	ownerOfPost: {type: Schema.Types.ObjectId, ref: 'User'},
	commentsArray: [commentSchema],
	usersLikedList: [{ type: Schema.Types.ObjectId, ref: 'User' , default: []}],
});

postSchema.virtual('numOfLikes').get(function () {return this.usersLikedList.length});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

//If child cannot exist without parent, then should be a document.
//If object can exist by itself, can have a collection.

// Or the flow of the data.