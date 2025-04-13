import { Router } from "express";
import {
  addService,
  changeHiddenState,
  getAllServices,
  updateService,
} from "../controllers/service.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * '/':
 *  get:
 *     tags:
 *     - Service
 *     summary: Get your Services
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/createServiceInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ServiceResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/").get(verifyJWT, getAllServices);

/**
 * @openapi
 * '/':
 *  post:
 *     tags:
 *     - Service
 *     summary: Create your Services
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/createServiceInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ServiceResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/").post(verifyJWT, addService);

/**
 * @openapi
 * '/hidden':
 *  post:
 *     tags:
 *     - Service
 *     summary: Update service hidden state
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/hidden").post(verifyJWT, changeHiddenState);

/**
 * @openapi
 * '/update':
 *  post:
 *     tags:
 *     - Service
 *     summary: Update your Services
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/createServiceInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ServiceResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.route("/update").post(verifyJWT, updateService);

export default router;
