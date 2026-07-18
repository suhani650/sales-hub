import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

export const validateRegister = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isLength({ max: 120 }).withMessage("Name cannot exceed 120 characters."),
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Must be a valid email address."),
  body("phone")
    .trim()
    .notEmpty().withMessage("Mobile number is required.")
    .matches(/^\+?[1-9]\d{1,14}$/).withMessage("Must be a valid phone number format (e.g. +91XXXXXXXXXX or standard digits)."),
  body("password")
    .notEmpty().withMessage("Password is required.")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
  body("role")
    .notEmpty().withMessage("Role is required.")
    .isIn(["CUSTOMER", "VENDOR", "FIELD_SALES_OFFICER"]).withMessage("Invalid role selected."),
  body("storeName")
    .if(body("role").equals("VENDOR"))
    .trim()
    .notEmpty().withMessage("Store name is required for sellers."),
  handleValidationErrors,
];

export const validateLoginRequest = [
  body("target")
    .trim()
    .notEmpty().withMessage("Email or mobile number is required."),
  handleValidationErrors,
];

export const validateLoginVerify = [
  body("target")
    .trim()
    .notEmpty().withMessage("Email or mobile number is required."),
  body("otp")
    .trim()
    .notEmpty().withMessage("OTP is required.")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be exactly 6 digits."),
  handleValidationErrors,
];

export const validateVerifySignup = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email address is required.")
    .isEmail().withMessage("Must be a valid email address."),
  body("otp")
    .trim()
    .notEmpty().withMessage("OTP is required.")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be exactly 6 digits."),
  handleValidationErrors,
];
