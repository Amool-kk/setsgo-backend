import { Router } from "express";
import {
  changeCurrentPassword,
  generateAccessAndRefereshToken,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  userProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import passport from "passport";

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

      return res
        .status(301)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .redirect(process.env.CORS_ORIGIN);
    } catch (error) {
      return res.status(500).json({ message: "testing" });
    }
  })(req, res, next);
});

router.route("/profile").get(verifyJWT, userProfile);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

export default router;
