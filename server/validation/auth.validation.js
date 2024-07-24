import { body , check} from "express-validator";
import userModel from "../models/userModel.js";

export const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email")
    .isEmail()
    .withMessage("Email is invalid.")
    .custom(async (value) => {
      const user = await userModel.findOne({ email: value });
      if (user) {
        return Promise.reject("Email already in use.");
      }
      return true;
    }),
  body("password").trim().notEmpty().withMessage("Password is required."),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .custom(async (value) => {
      const user = await userModel.findOne({ phone: value });
      if (user) {
        return Promise.reject("Phone already in use.");
      }
      return true;
    }),
];

export const loginValidation = [
  check('email')
    .isEmail()
    .withMessage('Please add a valid email.')
    .notEmpty()
    .withMessage('Please add an email.'),
  check('password')
    .optional()
    .isString()
    .withMessage('Password must be a string.'),
];