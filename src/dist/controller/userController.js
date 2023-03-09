"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePersonInfo = exports.updateUserImage = exports.loginUser = exports.changePassword = exports.resetPassword = exports.verifiedUser = exports.createUser = exports.viewSingleUser = exports.viewUsers = void 0;
const handlers_1 = require("./handlers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../model/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const streamifier_1 = __importDefault(require("streamifier"));
const cloudinary_1 = __importDefault(require("../utlis/cloudinary"));
const email_1 = require("../utlis/email");
dotenv_1.default.config();
// viewing all users on the platform
const viewUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //using the find method to get all users in the database through the model
        const allUsers = yield userModel_1.default.find();
        return res.status(200).json({
            message: "displaying all users from the database",
            data: allUsers,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
exports.viewUsers = viewUsers;
// viewing single user for details about that user
const viewSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //using the findBy user's uniqueness in the database through the model
        const allUsers = yield userModel_1.default.findById(req.params.id);
        return res.status(200).json({
            message: "displaying all users from the database",
            data: allUsers,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
exports.viewSingleUser = viewSingleUser;
//function for creating creating
exports.createUser = (0, handlers_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //getting user's input
        const { email, password, userName } = req.body;
        // securing the user's password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        // generating random token for newly created user
        const data = crypto_1.default.randomBytes(16).toString("hex");
        // const tokenData:any = jwt.sign({ data }, process.env.SECRET);
        // function to create new users
        const user = yield userModel_1.default.create({
            userName,
            email,
            password: hashed,
            status: "General",
            verified: false,
            // token: tokenData,
        });
        // Immediately user has been created a verification mail should be sent
        // Function for sending such mail
        (0, email_1.verifiedUserMail)(user)
            .then((result) => {
            console.log("message been sent to you: ");
        })
            .catch((error) => console.log(error));
        return res.status(201).json({
            message: "User has been created successfully...!",
            data: user,
        });
    }
    catch (err) {
        return res.status(400).json({
            message: "Something went wrong when creating this user",
            data: err.message,
        });
    }
}));
// verifying user's account, to prevent bot account opening
const verifiedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // checking if user exist in our DB
        const user = yield userModel_1.default.findById(req.params.id);
        // setting conditions for user to be verified
        if (user) {
            if (!user.verified && user.token !== "") {
                const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
                    verified: true,
                    token: "",
                }, { new: true });
                return res.status(200).json({
                    message: "Your account has now been verified, you can now Sign in",
                    data: user,
                });
            }
            else {
                return res
                    .status(404)
                    .json({ message: "user has not yet been verified" });
            }
        }
        else {
            return res
                .status(404)
                .json({ message: "cannot find you in our database" });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.verifiedUser = verifiedUser;
//  creating function to reset user password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // using user's input to check if user exit in our DB
        const { email } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        // setting conditions to check whether or not this has been verified on our platform before.
        if (user) {
            if ((user === null || user === void 0 ? void 0 : user.verified) && (user === null || user === void 0 ? void 0 : user.token) === "") {
                const token = crypto_1.default.randomBytes(5).toString("hex");
                const newToken = jsonwebtoken_1.default.sign({ token }, "thisIsHome");
                yield userModel_1.default.findByIdAndUpdate(user._id, { token: newToken }, { new: true });
                (0, email_1.resetUserPassword)(user, newToken)
                    .then((result) => {
                    console.log("message been sent to you: ");
                })
                    .catch((error) => console.log(error));
                return res.status(200).json({
                    message: "Please check your email to continue",
                });
            }
            else {
                return res
                    .status(404)
                    .json({ message: "You do not have enough right to do this!" });
            }
        }
        else {
            return res.status(404).json({ message: "user can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `An Error Occur: ${error} ` });
    }
});
exports.resetPassword = resetPassword;
// mail redirect function for the password change
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const user = yield userModel_1.default.findById(req.params.id);
        //
        if (user) {
            if (user.verified && user.token !== "") {
                console.log("working:");
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashed = yield bcrypt_1.default.hash(password, salt);
                //finally changing the password
                yield userModel_1.default.findByIdAndUpdate(user._id, {
                    token: "",
                    password: hashed,
                }, { new: true });
            }
        }
        else {
            return res.status(404).json({ message: "operation can't be done" });
        }
        return res.status(200).json({
            message: "password has been changed",
        });
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
});
exports.changePassword = changePassword;
// function to handle user's login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            if (user.verified) {
                // checking if password is correct after/and decrypting
                const passCheck = yield bcrypt_1.default.compare(password, user.password);
                //encrypting user's info for persistent
                const tokenData = jsonwebtoken_1.default.sign({ id: user._id, status: user.status }, process.env.SECRET);
                if (passCheck) {
                    const _a = user._doc, { password } = _a, info = __rest(_a, ["password"]);
                    return res.status(200).json({
                        message: "user found",
                        data: Object.assign(Object.assign({}, info), { tokenData }),
                    });
                }
                else {
                    return res.status(404).json({ message: "password is not correct" });
                }
            }
            else {
                return res
                    .status(404)
                    .json({ message: "user has not yet been verified" });
            }
        }
    }
    catch (err) {
        // else {
        // return res.status(404).json({ message: "user cannot be found" });
        // }
        // }
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.loginUser = loginUser;
//function for updatinig personal avatrs
const updateUserImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldUser = yield userModel_1.default.findById(req.params.id);
        yield cloudinary_1.default.uploader.destroy(oldUser === null || oldUser === void 0 ? void 0 : oldUser.avatarID);
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                let stream = yield cloudinary_1.default.uploader.upload_stream((error, result) => {
                    if (result) {
                        return resolve(result);
                    }
                    else {
                        console.log("reading Error: ", error);
                        return reject(error);
                    }
                });
                streamifier_1.default.createReadStream(req === null || req === void 0 ? void 0 : req.file.buffer).pipe(stream);
            }));
        };
        const image = yield streamUpload(req);
        const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, { avatar: image.secure_url }, { new: true });
        return res.status(200).json({
            message: "user found, update done!",
            data: user,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updateUserImage = updateUserImage;
//function for updating personal informations
const updatePersonInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, userName, phone } = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, { fullName, userName, phone }, { new: true });
        return res.status(200).json({
            message: "user info has been updated successfully",
            data: user,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updatePersonInfo = updatePersonInfo;
