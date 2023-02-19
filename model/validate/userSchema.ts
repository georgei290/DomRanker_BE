import joi from "joi";

// Validation Schema for userModel
const userSchema = {
  registerUser: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    status: joi.string().required(),
    token: joi.string().required(),
    verified: joi.boolean().required(),
  }),
  loginUser: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),
};

export default userSchema;
