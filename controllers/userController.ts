import express from 'express';
const user = express.Router();
import {User} from "../models/userSchema";
const bcrypt = require("bcrypt");
const alphaReg = new RegExp("^[a-zA-Z0-9_-]+$");

const checkAlpha = (str: string) => alphaReg.test(str);
const saltRounds = 10;

//routes
//seed
user.get('/seed', async (req, res) => {
	try {
		const seed = await User.create([{
			username: "admin",
			name: "admin",
			password: bcrypt.hashSync(
				"123",
				bcrypt.genSaltSync(saltRounds)
			)
		},{
			username: "user_03",
			name: "Brandon",
			password: bcrypt.hashSync(
				"098",
				bcrypt.genSaltSync(saltRounds)
			),
			listOfFriends: ["user_01"]
		}, {
			username: "user_02",
			name: "QY",
			password: bcrypt.hashSync(
				"456",
				bcrypt.genSaltSync(saltRounds)
			),
			listOfFriends: ["user_01"]
		}, {
			username: "user_01",
			name: "Sonakshi",
			password: bcrypt.hashSync(
				"789",
				bcrypt.genSaltSync(saltRounds)
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
	const {username, name, password} = req.body;
	try {
		if ( checkAlpha(username) && checkAlpha(name) && checkAlpha(password)){
			const hashPassword = bcrypt.hashSync(password,saltRounds);
			const newUser = await User.create({
				username: username,
				name: name,
				password: hashPassword,
			})
			res.status(201).send(newUser);
		} else {
			throw new Error("Validation failed");
		}
	} catch (error){
		res.status(400).send("Failed to create, " + error);
	}
});

user.post("/login", async (req, res) => {
	const {username, password} = req.body;
	try {
		const search = await User.find({ username: username }, { password: 1 });
    if (search.length === 0) {
      throw new Error("User not found!");
    } else if(bcrypt.compareSync(password, search[0].password)){
		req.session.username = username;
      res.sendStatus(200);
    } else {
		throw new Error("Login fail!")
	}
 } catch (error){
		console.log(error);
		res.status(400).send(`${error}`);
	}
});

user.get("/logout/:username", (req, res) => {
		if(req.session.username === req.params.username){
			req.session.destroy(() => res.sendStatus(200));
		} else res.status(200).send("No session found");
});

user.put("/reset", async (req, res) => {
	try {

	} catch (error){

	}
	res.send("api for ressetting password");
})

user.delete("/delete", async (req,res) => {
	//check they are logged in first.
// user themselves can delete their account
try {

} catch (error){

}
	res.send("api for deleting user");
})


module.exports = user;

