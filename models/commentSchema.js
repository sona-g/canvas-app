const mongoose = require('mongoose');
const { Schema } = mongoose;
// const User = require('./userSchema');

const commentSchema = new Schema({
	//Comment postId linked to the objectId of post
	//that the comment is meant to fall under through populate
	_id: Schema.Types.ObjectId,
	ownerOfComment: { type: Schema.Types.ObjectId,  },
	commentText: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
