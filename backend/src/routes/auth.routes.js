import { Router } from "express";
import {
  register,
  verifySignup,
  login,
  loginRequest,
  loginVerify,
  refresh,
  logout,
  me,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import {
  validateRegister,
  validateVerifySignup,
  validateLoginRequest,
  validateLoginVerify,
} from "../middleware/validation.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/verify-signup", validateVerifySignup, verifySignup);
router.post("/login", login);
router.post("/login-request", validateLoginRequest, loginRequest);
router.post("/login-verify", validateLoginVerify, loginVerify);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
