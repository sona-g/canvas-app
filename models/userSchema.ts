import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
	listOfFriends: { type: Array },
});

const User = mongoose.model('Schema', userSchema);

module.exports = User;
