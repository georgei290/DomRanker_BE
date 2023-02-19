"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.route("/view").get(userController_1.viewUsers);
router.route("/:id/view-user").get(userController_1.viewSingleUser);
router.route("/:id/verified-user").get(userController_1.verifiedUser);
router.route("/create-user").post(userController_1.createUser);
router.route("/login-user").post(userController_1.loginUser);
router.route("/reset-password").get(userController_1.resetPassword);
router.route("/:id/change-password").patch(userController_1.changePassword);
router.route("/update-avatar").patch(userController_1.updateUserImage);
router.route("/update-info").patch(userController_1.updatePersonInfo);
exports.default = router;
