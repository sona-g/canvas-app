import express from 'express';
const user = express.Router();
import { User } from "../models/userSchema";
const bcrypt = require("bcrypt");

//routes
//seed
user.get('/seed', async (req, res) => {
	try {
		const seed = await User.create([{
			username: "admin",
			name: "admin",
			password: bcrypt.hashSync(
				"123",
				bcrypt.genSaltSync(10)
			)
		},{
			username: "user_03",
			name: "Brandon",
			password: bcrypt.hashSync(
				"098",
				bcrypt.genSaltSync(10)
			),
			listOfFriends: ["user_01"]
		}, {
			username: "user_02",
			name: "QY",
			password: bcrypt.hashSync(
				"456",
				bcrypt.genSaltSync(10)
			),
			listOfFriends: ["user_01"]
		}, {
			username: "user_01",
			name: "Sonakshi",
			password: bcrypt.hashSync(
				"789",
				bcrypt.genSaltSync(10)
			),
			listOfFriends: ["user_02", "user_03"]
		}])
		res.status(201).send(seed);
	} catch (err){
		res.status(400).send(err);
	}
});

user.get("/:id", async (req,res) => {
	try {
		const {id} = req.params;
		const user = await User.findById(id);
		if(user === null) {
			throw new Error("No such ObjectID for User");
		} else res.status(202).send(user);

	} catch (error){
		console.log(error);
		res.status(400).send("User not found!");
	}
});

user.post("/new", async (req, res) => {
	res.send("api for creating new user");
	try {

	} catch (error){
		res.status(400).send("Failed to create" + error);
	}
	
});

user.post("/login", async (req, res) => {
	try {

	} catch (error){

	}
	res.send("api for logging in");
});

user.put("/reset", async (req, res) => {
	try {

	} catch (error){

	}
	res.send("api for ressetting password");
})

user.delete("/delete", async (req,res) => {
// user themselves can delete their account
try {

} catch (error){

}
	res.send("api for deleting user");
})


module.exports = user;
