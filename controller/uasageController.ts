import express, { Request, Response } from "express";
import userModel from "../model/userModel";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getKeywords = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) {
      return await axios({
        method: "get",
        url: process.env.LOGIN_URL!,
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data
          console.log(result);
          return res.status(200).json({
            message: "seen",
            data: result,
          });
        })
        .catch(function (error) {
          console.log(error);
          return res.status(200).json({
            message: "seen",
            data: error,
          });
        });
    } else {
      return res.status(200).json({
        message: "You do not have access right for this Operation",
      });
    }

    // return res.status(200).json({
    //   message: "password has been changed",
    // });
  } catch (error) {
    return res.status(404).json({ message: "An Error Occur" });
  }
};
