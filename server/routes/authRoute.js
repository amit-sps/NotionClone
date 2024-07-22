import express from "express";
import {
  registerController,
  loginController,
  loginControllerForGoogle,
  forgotPasswordController,
  resetPasswordController,
  changedPasswordController,
  logoutUser,
  refreshAccessToken,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { registerValidation } from "../validation/auth.validation.js";


const router = express.Router();


router.post("/register", registerValidation, registerController);

router.post("/login", loginController);

router.get("/login/success", loginControllerForGoogle);

router.post(
  "/logout",
  // requireSignIn,
  logoutUser
);

// Forgot password route
//to send a link to the reset password
router.post("/forgot-password", forgotPasswordController);

// Reset password route
// with a token and user id in params and password in body to reset the password
router.post("/reset-password/:id/:token", resetPasswordController);

// Changed password route
router.post("/changed-password", requireSignIn, changedPasswordController);

// Protected user authentication route
//to check the token for private routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Refresh token route
router.post("/refresh-token", refreshAccessToken);
export default router;
