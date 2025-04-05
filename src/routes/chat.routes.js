import { Router } from "express";
import {
  deleteChat,
  getChats,
  getContacts,
} from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/contacts").get(verifyJWT, getContacts);
router.route("/:userId").get(verifyJWT, getChats);
router.route("/delete/:chatId").get(verifyJWT, deleteChat);

export default router;
