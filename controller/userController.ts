import express, { NextFunction, Request, Response } from "express";
import { userData } from "../model/interface";
import { asyncHandler } from "./handlers";
import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../model/userModel";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// viewing all users on the platform
export const viewUsers = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    //using the find method to get all users in the database through the model

    const allUsers = await userModel.find();

    return res.status(200).json({
      message: "displaying all users from the database",
      data: allUsers,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error,
    });
  }
};

// viewing single user for details about that user
export const viewSingleUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    //using the findBy user's uniqueness in the database through the model

    const allUsers = await userModel.findById(req.params.id);

    return res.status(200).json({
      message: "displaying all users from the database",
      data: allUsers,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error,
    });
  }
};

//function for creating creating
export const createUser = asyncHandler(
  async (
    req: Request<{}, {}, userData>,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      //getting user's input
      const { email, password, userName } = req.body;

      // securing the user's password
      const salt: string = await bcrypt.genSalt(10);
      const hashed: string = await bcrypt.hash(password, salt);

      // generating random token for newly created user
      const data = crypto.randomBytes(16).toString("hex");
      const tokenData = jwt.sign({ data });

      // function to create new users
      const user = await userModel.create({
        email,
        password: hashed,
        status: "General",
        verified: false,
        token: tokenData,
      });

      return res.status(201).json({
        message: "User has been created successfully...!",
        data: user,
      });
    } catch (err: any) {
      return res.status(400).json({
        message: "Something went wrong when creating this user",
        data: err.message,
      });
    }
  },
);

// verifying user's account, to prevent bot account opening
export const verifiedUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    // checking if user exist in our DB
    const user = await userModel.findById(req.params.id);

    // setting conditions for user to be verified
    if (user) {
      if (!user.verified && user.token !== "") {
        const user = await userModel.findByIdAndUpdate(
          req.params.id,
          {
            verified: true,
            token: "",
          },
          { new: true },
        );

        return res.status(200).json({
          message: "Your account has now been verified, you can now Sign in",
          data: user,
        });
      } else {
        return res
          .status(404)
          .json({ message: "user has not yet been verified" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "cannot find you in our database" });
    }
  } catch (err) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

//  creating function to reset user password
export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    // using user's input to check if user exit in our DB
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    // setting conditions to check whether or not this has been verified on our platform before.
    if (user) {
      if (user?.verified && user?.token === "") {
        const token = crypto.randomBytes(5).toString("hex");
        const newToken = jwt.sign({ token }, "thisIsHome");

        await userModel.findByIdAndUpdate(
          user._id,
          { token: newToken },
          { new: true },
        );

        // resetMyPasswordUserMail(user, newToken)
        //   .then((result) => {
        //     console.log("message been sent to you: ");
        //   })
        //   .catch((error) => console.log(error));

        return res.status(200).json({
          message: "Please check your email to continue",
        });
      } else {
        return res
          .status(404)
          .json({ message: "You do not have enough right to do this!" });
      }
    } else {
      return res.status(404).json({ message: "user can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `An Error Occur: ${error} ` });
  }
};

// mail redirect function for the password change
export const changePassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { password } = req.body;

    const user = await userModel.findById(req.params.id);

    //
    if (user) {
      if (user.verified && user.token === req.params.token) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        //finally changing the password
        await userModel.findByIdAndUpdate(
          user._id,
          {
            token: "",
            password: hashed,
          },
          { new: true },
        );
      }
    } else {
      return res.status(404).json({ message: "operation can't be done" });
    }

    return res.status(200).json({
      message: "password has been changed",
    });
  } catch (error) {
    return res.status(404).json({ message: "An Error Occur" });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      if (user.verified) {
        // checking if password is correct after/and decrypting
        const passCheck = await bcrypt.compare(password, user.password);

        //encrypting user's info for persistent
        const token = jwt.sign(
          { id: user._id, status: user.status },
          process.env.SECRET,
        );

        if (passCheck) {
          const { password, ...info } = user._doc;

          return res.status(200).json({
            message: "user found",
            data: {
              ...info,
              token,
            },
          });
        } else {
          return res.status(404).json({ message: "password is not correct" });
        }
      } else {
        return res
          .status(404)
          .json({ message: "user has not yet been verified" });
      }
    } else {
      return res.status(404).json({ message: "user cannot be found" });
    }
  } catch (err) {
    return res.status(404).json({
      message: `Error: ${err}`,
    });
  }
};
