import express, { Router } from "express";
import { createUser, viewUsers } from "../controller/userController";

const router: Router = express.Router();

router.route("/view").get(viewUsers);
router.route("/create-user").post(createUser);

export default router;
