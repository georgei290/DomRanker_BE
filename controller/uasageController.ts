import express, { Request, Response } from "express";
import userModel from "../model/userModel";
import axios from "axios";
import requestIp from "request-ip";
import dotenv from "dotenv";
dotenv.config();

interface iData {
  city: string;
  country: string;
  continent: string;
}

export const getKeywords = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    let myLocationData = {} as iData;

    await axios
      .get(`${process.env.LOCATION}api_key=${process.env.LOCATION_KEY}`)
      .then((response) => {
        myLocationData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(myLocationData);

    let language_name = "English (United Kingdom)";
    // let location_name = "London,England,United Kingdom";
    let location_name = `${myLocationData?.city},${myLocationData?.country},${myLocationData?.continent}`;
    let keyword = "javascript";

    const user = await userModel.findById(req.params.id);
    const { keywords } = req.body;

    let searchedData = [
      {
        language_name,
        location_name,
        keyword: keywords,
      },
    ];

    if (user) {
      return await axios({
        method: "post",
        url: process.env.GOOGLE_URL!,
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: searchedData,
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"];
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
