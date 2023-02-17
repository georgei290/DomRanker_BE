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

export default router;
