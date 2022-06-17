import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUser {
  name: string;
  username: string;
  password: string;
  listOfFriends?: string[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, index: true, unique: true},
    name: { type: String, required: true },
    password: { type: String, required: true },
    listOfFriends: { type: Array },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
User.createIndexes();

// export default User;