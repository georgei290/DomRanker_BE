import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";
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
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/resetPassword.ejs");
    const data = await ejs.renderFile(buildFile, {
      id: user._id,
      myToken,
      url,
    });

    const mailOptions = {
      from: "SchoolCode ❤❤❤ <newstudentsportal2@gmail.com>",
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
        user: "ajwalletcoins@gmail.com",
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
      from: "My SEO Optimizer ❤❤❤ <newstudentsportal2@gmail.com>",
      to: user.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};
