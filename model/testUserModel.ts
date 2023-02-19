import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

interface userData {
  status?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  token?: string;
  verified?: boolean;
}

interface iUserData extends userData, mongoose.Document {}

// creating model for the users
const userTestModel = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    avatar: {
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
      required: [true, "Please enter your password"],
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
  },
);

// preparing the models for export and usage
export default mongoose.model<iUserData>("usersTest", userTestModel);
