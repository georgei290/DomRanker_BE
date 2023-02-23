import express, { Router } from "express";
import {
  createUser,
  viewUsers,
  viewSingleUser,
  verifiedUser,
  resetPassword,
  changePassword,
  updateUserImage,
  updatePersonInfo,
  loginUser,
} from "../controller/userController";
import passport from "passport";

const router: Router = express.Router();

router.route("/view").get(viewUsers);
router.route("/:id/view-user").get(viewSingleUser);

router.route("/:id/verified-user").get(verifiedUser);

router.route("/create-user").post(createUser);
router.route("/login-user").post(loginUser);

router.route("/reset-password").get(resetPassword);
router.route("/:id/change-password").patch(changePassword);

router.route("/update-avatar").patch(updateUserImage);
router.route("/update-info").patch(updatePersonInfo);

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
  }),
);

// router
//   .route("/google")
//   .get(passport.authenticate("google", ["profile", "email"]));

export default router;
