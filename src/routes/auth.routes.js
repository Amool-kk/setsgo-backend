import { Router } from "express";
import {
  generateAccessAndRefereshToken,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// google login
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    try {
      const { accessToken, refreshToken } =
        await generateAccessAndRefereshToken(user._id);

      const options = {
        httpOnly: true,
        secure: true,
      };

      const data = {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, data, "User logged In Successfully"));
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  })(req, res, next);
});

router.route("/logout").post(verifyJWT, logoutUser);

export default router;
