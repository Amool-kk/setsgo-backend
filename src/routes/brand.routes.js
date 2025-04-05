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

router.route("/").get(verifyJWT, getBrand);

router.route("/").post(verifyJWT, createBrand);

router.route("/update").post(verifyJWT, updateBrand);

router.route("/verify/:token").get(inviteVerify);

router.route("/teamupdate/:token").get(verifyJWT, updateBrandTeam);

router.route("/teamInvite").post(verifyJWT, sendTeamInvite);

export default router;
