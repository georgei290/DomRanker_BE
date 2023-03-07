import { userData } from "./interface";
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

//creating extended interface for database addons
interface iUserData extends userData, mongoose.Document {
  _doc: any;
}

// creating model for the users
const userModel = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    fullName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowerCase: true,
      trim: true,
      required: [true, "Please enter your Email"],
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      // required: [true, "Please enter your password"],
    },
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// preparing the models for export and usage
export default mongoose.model<iUserData>("users", userModel);
