import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.route("/:chatId").get(verifyJWT, getMessages);
router.route("/sent").post(verifyJWT, sendMessage);

export default router;
