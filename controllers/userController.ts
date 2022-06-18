import express, { Request } from 'express';
const user = express.Router();
import {User} from "../models/userSchema";
const bcrypt = require("bcrypt");
const alphaReg = new RegExp("^[a-zA-Z0-9_-]+$");
import { StatusCodes } from 'http-status-codes';

const checkAlpha = (str: string) => alphaReg.test(str);
const saltRounds = 10;

export const isAuthenticated = (username: string, req : Request) => req.session.username === username;

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
		res.status(StatusCodes.CREATED).send(seed);
	} catch (err){
		res.status(StatusCodes.BAD_REQUEST).send(err);
	}
});

//Retrieve Single user and all details.
user.get("/:id", async (req,res) => {
	try {
		const {id} = req.params;
		const user = await User.findById(id);
		if(user === null) {
			throw new Error("No such ObjectID for User");
		} else res.status(StatusCodes.ACCEPTED).send(user);

	} catch (error){
		console.log(error);
		res.status(StatusCodes.BAD_REQUEST).send("User not found!");
	}
});

//Create new user
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
			res.status(StatusCodes.CREATED).send(newUser);
		} else {
			throw new Error("Validation failed");
		}
	} catch (error){
		res.status(StatusCodes.BAD_REQUEST).send("Failed to create, " + error);
	}
});

//User Login
user.post("/login", async (req, res) => {
	const {username, password} = req.body;
	try {
		const search = await User.find({ username: username }, { password: 1 });
    if (search.length === 0) {
      throw new Error("User not found!");
    } else if(bcrypt.compareSync(password, search[0].password)){
		req.session.username = username;
      res.sendStatus(StatusCodes.OK);
    } else {
		throw new Error("Login fail!")
	}
 } catch (error){
		console.log(error);
		res.status(StatusCodes.BAD_REQUEST).send(`${error}`);
	}
});

//User Logout
user.get("/logout/:username", (req, res) => {
		if(isAuthenticated(req.params.username, req)){
			req.session.destroy(() => res.sendStatus(StatusCodes.OK));
		} else res.status(StatusCodes.OK).send("No session found");
});

//Very weak password reset.
user.put("/reset", async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.findOneAndUpdate(
      { username: username },
      { password: bcrypt.hashSync(password, saltRounds) }
    );
    res.status(StatusCodes.ACCEPTED);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
});

user.delete("/delete/:username", async (req, res) => {
  //check they are logged in first.
  // user themselves can delete their account
  try {
    if (isAuthenticated(req.params.username, req)) {
      const removed = await User.findOneAndDelete({
        username: req.params.username});
      res.status(StatusCodes.ACCEPTED).send(removed);
    } else res.sendStatus(StatusCodes.UNAUTHORIZED);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
});

//TO BE REMOVED?
user.get("/", async (req, res) => {
	try {
	const users = await User.find({},{username:1, name:1, listOfFriends:1 });
	res.status(StatusCodes.ACCEPTED).send(users);
 } catch (err){
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
 }}
);
module.exports = user;
