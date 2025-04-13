import { Router } from "express";
import {
  changeCurrentPassword,
  generateAccessAndRefereshToken,
  loginUser,
  logoutUser,
  passwordResetLink,
  passwordReset,
  refreshAccessToken,
  registerUser,
  userProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = Router();

/**
 * @openapi
 * '/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/createUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/register").post(registerUser);

/**
 * @openapi
 * '/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/createUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/login").post(loginUser);

// google login
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    console.log("8***********************8", user);
    if (err || !user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    try {
      const { accessToken, refreshToken } =
        await generateAccessAndRefereshToken(user._id);

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
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

/**
 * @openapi
 * '/auth/profile':
 *  get:
 *     tags:
 *     - Auth
 *     summary: User Profile
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      401:
 *        description: Unauthorized
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/profile").get(verifyJWT, userProfile);

/**
 * @openapi
 * '/auth/logout':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Logout route
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - _id
 *            properties:
 *              _id:
 *                type: string
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      400:
 *        description: Bad request
 */
router.route("/logout").post(verifyJWT, logoutUser);

/**
 * @openapi
 * '/auth/refresh-token':
 *  post:
 *     tags:
 *     - Auth
 *     summary: access token update using refresh token
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Invalid refresh token
 *      400:
 *        description: Bad request
 */
router.route("/refresh-token").post(refreshAccessToken);

/**
 * @openapi
 * '/auth/change-password':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Update user password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - oldPassword
 *              - newPassword
 *            properties:
 *              oldPassword:
 *                type: string
 *              newPassword:
 *                type: string
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

/**
 * @openapi
 * '/auth/passwordReset':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Send email for reset password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/passwordReset").post(passwordResetLink);

/**
 * @openapi
 * '/auth//passwordReset/{userId}/{token}':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Update user password
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *      - name: token
 *        in: path
 *        description: Token for reset passwrod link verify
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - password
 *            properties:
 *              password:
 *                type: string
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/passwordReset/:userId/:token").post(passwordReset);

export default router;
