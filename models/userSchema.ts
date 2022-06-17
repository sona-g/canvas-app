import mongoose from "mongoose";
const { Schema } = mongoose;

interface IUser {
  name: string;
  username: string;
  password: string;
  listOfFriends?: string[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    listOfFriends: { type: Array },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
