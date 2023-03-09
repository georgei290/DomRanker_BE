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

interface iLocation {
  location_code?: number;
  location_name?: string;
  location_code_parent?: number | null;
  country_iso_code?: string;
  location_type?: string;
}
interface iLang {
  language_name: string;
  language_code: string;
}

const LOCATION_KEY = "13d114e76253410796c509c40729459b";
const LOCATION = "https://ipgeolocation.abstractapi.com/v1/?";
const mainLocation = "Lagos,Nigeria";

let myLocationData = {} as iData;
let location = {} as iLocation;
let language = {} as iLang;

// GOOGLE SEO
export const getGoogleKeywords = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    try {
      // Search has to be location base to get the best of Result

      //   getting user's location
      await axios
        .get(`${LOCATION}api_key=${LOCATION_KEY}`)
        .then((response) => {
          myLocationData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      let language_name = "English (United Kingdom)";

      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/locations",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            country: `us`,
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data
          //
          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              console.log(props);
              location = props;
            } else {
              return;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          language_name,
          location_name: location.location_name,
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

// BING SEO
export const getBingKeywords = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let myLocationData = {} as iData;

      // Search has to be location base to get the best of Result

      //   getting user's location
      await axios
        .get(`${LOCATION}api_key=${LOCATION_KEY}`)
        .then((response) => {
          myLocationData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      let language_name = "English (United Kingdom)";
      let location_name = `${myLocationData?.city},${myLocationData?.country}`;

      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/locations",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            country: `us`,
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data
          //
          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              console.log(props);
              location = props;
            } else {
              return;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          language_name,
          location_name: location.location_name,
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

// YAHOO SEO
export const postYahooKeywords = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let myLocationData = {} as iData;

      // Search has to be location base to get the best of Result

      //   getting user's location
      await axios
        .get(`${LOCATION}api_key=${LOCATION_KEY}`)
        .then((response) => {
          myLocationData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      let language_name = "English";
      let location_name = `${myLocationData?.city},${myLocationData?.country}`;

      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/yahoo/locations",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            country: `us`,
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data
          //
          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              console.log("this is location", props);
              location = props;
            } else {
              return;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          keyword: keywords,
          language_code: "en",
          location_code: 2840,
        },
      ];

      if (user) {
        //  getting user's searched result live/regular
        const mainURL = `${process.env.YAHOO_URL}`;
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

// Secondly to get/view the requested search result
export const getYahooKeywords = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.YAHOO_URL}/task_get/regular/${req.params.myIDs}`;
        return await axios({
          method: "get",
          url: mainURL,
          auth: {
            username: process.env.LOGIN_ID!,
            password: process.env.LOGIN_KEY!,
          },
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

// BAUIDU SEO: Has a two call system to show the results
// First to request for the search result
export const postBaiduKeywords = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      let myLocationData = {} as iData;

      // Search has to be location base to get the best of Result

      //   getting user's location
      await axios
        .get(`${LOCATION}api_key=${LOCATION_KEY}`)
        .then((response) => {
          myLocationData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      let location_name = `${myLocationData?.city},${myLocationData?.country}`;

      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/languages",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            version: "v3",
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data

          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              language = props;
            } else {
              // console.log("No result");
              return "No result";
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/locations",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            country: `us`,
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data
          //
          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              location = props;
            } else {
              return;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          // language_code: "en",
          // location_code: location.location_code,
          language_code: "zh_CN",
          location_code: 2156,
          keyword: keywords,
          tag: "some_string_123",
          postback_url: "https://your-server.com/postbackscript.php",
          postback_data: "regular",
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.BAIDU_URL}/task_post`;
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
// Secondly to get/view the requested search result
export const getBaiduKeywords = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.BAIDU_URL}/task_get/regular/${req.params.myIDs}`;
        return await axios({
          method: "get",
          url: mainURL,
          auth: {
            username: process.env.LOGIN_ID!,
            password: process.env.LOGIN_KEY!,
          },
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

// NAVER SEO: Has a two call system to show the results
// First to request for the search result
export const postNaverKeywords = asyncHandler(
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

      //  For getting Language
      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/languages",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            version: "v3",
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data

          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              language = props;
            } else {
              // console.log("No result");
              return "No result";
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //  For getting Location
      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/locations",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            country: `us`,
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data
          //
          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              location = props;
            } else {
              return;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          language_code: "en",
          location_code: 2840,
          keyword: keywords,
          device: "desktop",
          tag: "some_string_123",
          postback_url: "https://your-server.com/postbackscript.php",
          postback_data: "regular",
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.NAVER_URL}/task_post`;
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
          .then(function (response) {
            console.log("getting results: ");
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
// Secondly to get/view the requested search result
export const getNaverKeywords = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.NAVER_URL}/task_get/regular/${req.params.myIDs}`;
        return await axios({
          method: "get",
          url: mainURL,
          auth: {
            username: process.env.LOGIN_ID!,
            password: process.env.LOGIN_KEY!,
          },
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

// SEZNAM SEO: Has a two call system to show the results
// First to request for the search result
export const postSeznamKeywords = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      let myLocationData = {} as iData;

      // Search has to be location base to get the best of Result

      //   getting user's location
      await axios
        .get(`${LOCATION}api_key=${LOCATION_KEY}`)
        .then((response) => {
          myLocationData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      let language_name = "English (United Kingdom)";
      let location_name = `${myLocationData?.city},${myLocationData?.country}`;

      //  For getting Language
      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/languages",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            version: "v3",
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data

          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              language = props;
            } else {
              // console.log("No result");
              return "No result";
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //  For getting Location
      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/locations",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            country: `us`,
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data
          //
          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              location = props;
            } else {
              return;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          language_code: "cs",
          location_code: 21502,
          keyword: keywords,
          tag: "some_string_123",
          postback_url: "https://your-server.com/postbackscript.php",
          postback_data: "regular",
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.SEZNAM_URL}/task_post`;
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
          .then(function (response) {
            console.log("getting results: ");
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
// Secondly to get/view the requested search result
export const getSeznamKeywords = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.SEZNAM_URL}/task_get/advanced/${req.params.myIDs}`;
        return await axios({
          method: "get",
          url: mainURL,
          auth: {
            username: process.env.LOGIN_ID!,
            password: process.env.LOGIN_KEY!,
          },
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

// Backline summary
export const gettBacklinkSummary = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      let myLocationData = {} as iData;

      // Search has to be location base to get the best of Result

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          // target: "explodingtopics.com",
          target: keywords,
          internal_list_limit: 10,
          include_subdomains: true,
          backlinks_filters: ["dofollow", "=", true],
          backlinks_status_type: "all",
        },
      ];

      if (user) {
        //  getting user's searched result
        const mainURL = `${process.env.BACKLINK_SUMMARY_URL}`;
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
export const getTestBacklinkSummary = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      let myLocationData = {} as iData;

      // Search has to be location base to get the best of Result

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;

      let searchedData = [
        {
          target: "explodingtopics.com",
          internal_list_limit: 10,
          include_subdomains: true,
          backlinks_filters: ["dofollow", "=", true],
          backlinks_status_type: "all",
        },
      ];

      if (user) {
        //  getting user's searched result
        const test = "https://api.dataforseo.com/v3/backlinks/summary/live";
        const mainURL = `${test}`;
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

//  Business Data API

export const postBusinessInfo = asyncHandler(
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

      //  For getting Language
      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/languages",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            version: "v3",
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data

          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              language = props;
            } else {
              // console.log("No result");
              return "No result";
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //  For getting Location
      await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/serp/google/locations",
        auth: {
          username: process.env.LOGIN_ID!,
          password: process.env.LOGIN_KEY!,
        },
        data: [
          {
            country: `us`,
          },
        ],
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          var result = response["data"]["tasks"][0]["result"];
          // Result data
          //
          result.map((props: any) => {
            if (props.location_name === myLocationData?.country) {
              location = props;
            } else {
              return;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keywords } = req.body;
      console.log(location.country_iso_code?.toLowerCase());
      let searchedData = [
        {
          // language_code: "en",
          // location_name: location.location_name,
          language_code: "en",
          location_name: location.location_name,
          keyword: keywords,
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.BUSINESS_INFO_URL}/task_post`;
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
          .then(function (response) {
            console.log("getting results: ");
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

export const getBusinessInfo = asyncHandler(
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
        //  getting business's searched result
        const mainURL = `${process.env.BUSINESS_INFO_URL}/task_get/${req.params.myID}`;
        return await axios({
          method: "get",
          url: mainURL,
          auth: {
            username: process.env.LOGIN_ID!,
            password: process.env.LOGIN_KEY!,
          },
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

//  onPages API

export const postOnPagesData = asyncHandler(
  async (req: Request, res: Response, dataID: string): Promise<Response> => {
    try {
      // Search has to be location base to get the best of Result

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { word } = req.body;
      console.log("New Data Search: ", word);
      let searchedData = [
        {
          target: word,
          max_crawl_pages: 10,
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.ONPAGE_URL}/task_post`;

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
            return res.status(200).json({
              message: "seen",
              data: result,
            });
          })
          .catch(function (error) {
            console.log(error);
            return res.status(200).json({
              message: "Error",
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

export const getOnPagesData = asyncHandler(
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

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { dataID } = req.body;

      let searchedData = [
        {
          id: dataID,
          // filters: [
          // ["resource_type", "=", "html"],
          // "and",
          // ["meta.scripts_count", ">", 40],
          // ],
          order_by: ["meta.content.plain_text_word_count,desc"],
          limit: 10,
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.ONPAGE_URL}/pages`;
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
          .then(function (response) {
            var result = response["data"]["tasks"];
            // Result data
            return res.status(200).json({
              message: "seen",
              data: result,
            });
          })
          .catch(function (error) {
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

export const getKeywordData = asyncHandler(
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

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { target } = req.body;

      let searchedData = [
        {
          language_code: "en",
          location_code: 2840,
          target,
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.KEYWORD_URL}`;
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
          .then(function (response) {
            var result = response["data"]["tasks"];
            // Result data
            return res.status(200).json({
              message: "seen",
              data: result,
            });
          })
          .catch(function (error) {
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

export const postContentSummaryData = asyncHandler(
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

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keyword, type } = req.body;

      let searchedData = [
        {
          keyword,
          content_mode: "as_is",
          page_type: [type],
          filters: [
            ["language", "=", "en"],
            "and",
            ["content_info.rating.rating_value", ">", 0],
          ],
          order_by: ["main_domain,asc"],
          offset: 10,
          limit: 3,
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.CONTENT_URL}`;
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
          .then(function (response) {
            var result = response["data"]["tasks"];
            // Result data
            return res.status(200).json({
              message: "seen",
              data: result,
            });
          })
          .catch(function (error) {
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

export const postContentSearchData = asyncHandler(
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

      //   checking for the validity of a user
      const user = await userModel.findById(req.params.id);

      //    getting user's search words
      const { keyword } = req.body;

      let searchedData = [
        {
          keyword,
          search_mode: "as_is",
          page_type: [
            "ecommerce",
            "news",
            "blogs",
            "message-boards",
            "organization",
          ],
          filters: [["content_info.rating.rating_value", ">", 0]],
          internal_list_limit: 8,
          positive_connotation_threshold: 0.5,
        },
      ];

      if (user) {
        //  getting business's searched result
        const mainURL = `${process.env.CONTENT_SEARCH_URL}`;
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
          .then(function (response) {
            var result = response["data"]["tasks"];
            // Result data
            return res.status(200).json({
              message: "seen",
              data: result,
            });
          })
          .catch(function (error) {
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

// Business Info
