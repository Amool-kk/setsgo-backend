import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getBrand,
  createBrand,
  updateBrand,
  updateBrandTeam,
} from "../controllers/brand.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getBrand);

router.route("/").post(verifyJWT, createBrand);

router.route("/update").post(verifyJWT, updateBrand);

router.route("/teamupdate").post(verifyJWT, updateBrandTeam);

export default router;
