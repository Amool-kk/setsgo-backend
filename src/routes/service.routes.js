import { Router } from "express";
import {
  addService,
  changeHiddenState,
  getAllServices,
  updateService,
} from "../controllers/service.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getAllServices);

router.route("/").post(verifyJWT, addService);

router.route("/hidden").post(verifyJWT, changeHiddenState);

router.route("/update").post(verifyJWT, updateService);

export default router;
