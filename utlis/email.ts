import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1054310070984-bqesvn0ftgmhcn6p6292jskt91rk4n5e.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04dIMtDvNwamFCgYIARAAGAQSNwF-L9IrFJgJO7AzsDu8l4eJ0xQq5VcPSg9TL3sYVHufYPXj-inHC6ApFpP7hvl8goZR32Cd9TY";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const url: string = "http://localhost:2233";

export const resetUserPassword = async (user: any, myToken: any) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "georgeseo06@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/passwordReset.ejs");
    const data = await ejs.renderFile(buildFile, {
      id: user._id,
      myToken,
      url,
    });

    const mailOptions = {
      from: "My SEO Optimizer ❤❤❤ <georgeseo06@gmail.com>",
      to: user?.email,
      subject: "Reset Password",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export const verifiedUserMail = async (user: any) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "georgeseo06@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/AccountCreated.ejs");

    const data = await ejs.renderFile(buildFile, {
      email: user.email,
      id: user?._id,
      status: user.status,
      url,
    });

    const mailOptions = {
      from: "My SEO Optimizer ❤❤❤ <georgeseo06@gmail.com>",
      to: user.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};
