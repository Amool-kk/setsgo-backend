import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getBrand,
  createBrand,
  updateBrand,
  updateBrandTeam,
  sendTeamInvite,
  inviteVerify,
} from "../controllers/brand.controller.js";

const router = Router();

/**
 * @openapi
 * '/brand':
 *  get:
 *     tags:
 *     - Brand
 *     summary: Get your brand
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/").get(verifyJWT, getBrand);

/**
 * @openapi
 * '/brand':
 *  post:
 *     tags:
 *     - Brand
 *     summary: Create your brand
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/createBrand'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateBrandResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/").post(verifyJWT, createBrand);

/**
 * @openapi
 * '/brand/update':
 *  post:
 *     tags:
 *     - Brand
 *     summary: Update your brand details
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/createBrand'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateBrandResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/update").post(verifyJWT, updateBrand);

/**
 * @openapi
 * '/brand/verify/{token}':
 *  post:
 *     tags:
 *     - Brand
 *     summary: Teaminvite link verify
 *     parameters:
 *      - name: token
 *        in: path
 *        description: Token for verify
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/verify/:token").get(inviteVerify);

/**
 * @openapi
 * '/brand/teamupdate/{token}':
 *  post:
 *     tags:
 *     - Brand
 *     summary: Update Brand team using invite link
 *     parameters:
 *      - name: token
 *        in: path
 *        description: Token for verify
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/teamupdate/:token").post(verifyJWT, updateBrandTeam);

/**
 * @openapi
 * '/brand/teamInvite':
 *  post:
 *     tags:
 *     - Brand
 *     summary: Send team invite link to email
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              required:
 *                 - teamEmail
 *              properties:
 *                teamEmail:
 *                  type: string
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/teamInvite").post(verifyJWT, sendTeamInvite);

export default router;
