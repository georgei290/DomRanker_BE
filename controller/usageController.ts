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
      console.log("Starting");
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

export const getYahooKeywords = asyncHandler(
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
          url: process.env.YAHOO_URL!,
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

export const getBaiduKeywords = asyncHandler(
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
          // language_name,
          // location_name,
          // keyword: keywords,
          language_code: "zh_CN",
          location_code: 2156,
          keyword: "albert einstein",
          device: "desktop",
          tag: "some_string_123",
          postback_url: "https://your-server.com/postbackscript.php",
          postback_data: "regular",
        },
      ];

      if (user) {
        //  getting user's searched result
        const mainURL = `${process.env.BAIDU_URL!}/task_post`;
        return await axios({
          method: "post",
          url: mainURL,
          auth: {
            username: process.env.LOGIN_ID!,
            password: process.env.LOGIN_KEY!,
          },
          data: searchedData,
          headers: {
            "content-type": "application/json",
          },
        })
          .then(async function (response) {
            var result = response["data"]["tasks"];
            // Result data

            const mainURL = `${process.env.BAIDU_URL!}/task_get/regular/${
              result[0].id
            }`;
            return await axios({
              method: "get",
              url: mainURL!,
              auth: {
                username: process.env.LOGIN_ID!,
                password: process.env.LOGIN_KEY!,
              },
              // data: searchedData,
              headers: {
                "content-type": "application/json",
              },
            })
              .then(function (response) {
                var newResult = response["data"]["tasks"];
                // newResult data
                console.log("Reading the GET DATA: ", response);
                console.log(" ");
                console.log("READING DATA: ", newResult);
                return res.status(200).json({
                  message: "seen",
                  data: newResult,
                });
              })
              .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                  message: "seen",
                  data: error,
                });
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

export const gettingBaiduKeywords = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
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
        const mainURL = `${process.env.BAIDU_URL!}/task_get/regular/${dataID}`;
        return await axios({
          method: "get",
          url: mainURL!,
          auth: {
            username: process.env.LOGIN_ID!,
            password: process.env.LOGIN_KEY!,
          },
          // data: searchedData,
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
