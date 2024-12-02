import { body } from "express-validator";

export const registerUserValidator = [
  body("firstName").isString().isLength({ min: 2 }),
  body("lastName").isString().isLength({ min: 2 }),
  body("email").isEmail(),
  body("password")
    .isLength({ min: 8 })
    .contains(/[a-z]/)
    .contains(/[A-Z]/)
    .contains(/[0-9]/)
    .contains(/[^a-zA-Z0-9]/),
];

export const loginUserValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];

export const forgotPassworValidator = [body("email").isEmail()];

export const resetPasswordValidator = [
  body("password")
    .isLength({ min: 8 })
    .contains(/[a-z]/)
    .contains(/[A-Z]/)
    .contains(/[0-9]/)
    .contains(/[^a-zA-Z0-9]/),
  body("code").isString().isLength({ min: 6 }),
];
