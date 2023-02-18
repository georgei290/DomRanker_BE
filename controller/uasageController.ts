import { Request, Response } from "express";
import userModel from "../model/userModel";
import axios from "axios";
import dotenv from "dotenv";
import { asyncHandler } from "./handlers";
dotenv.config();

interface iData {
  city: string;
  country: string;
  continent: string;
}

export const getGoogleKeywords = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let myLocationData = {} as iData;

      // Search has to be location base to get the best of Result

      //   getting user's location
      await axios
        .get(`${process.env.LOCATION}api_key=${process.env.LOCATION_KEY}`)
        .then((response) => {
          myLocationData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      let language_name = "English (United Kingdom)";
      let location_name = `${myLocationData?.city},${myLocationData?.country}`;

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          language_name,
          location_name,
          keyword: keywords,
        },
      ];

      if (user) {
        //  getting user's searched result
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
    } catch (error) {
      return res.status(404).json({ message: "An Error Occur" });
    }
  },
);

export const getBingKeywords = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let myLocationData = {} as iData;

      // Search has to be location base to get the best of Result

      //   getting user's location
      await axios
        .get(`${process.env.LOCATION}api_key=${process.env.LOCATION_KEY}`)
        .then((response) => {
          myLocationData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      let language_name = "English (United Kingdom)";
      let location_name = `${myLocationData?.city},${myLocationData?.country}`;

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          language_name,
          location_name,
          keyword: keywords,
        },
      ];

      if (user) {
        //  getting user's searched result
        return await axios({
          method: "post",
          url: process.env.BING_URL!,
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
    } catch (error) {
      return res.status(404).json({ message: "An Error Occur" });
    }
  },
);
