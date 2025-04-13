import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./utils/google.strategies.js";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(passport.initialize());

//routes import
import healthcheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
import serviceRouter from "./routes/service.routes.js";
import brandRouter from "./routes/brand.routes.js";

//routes declaration
/**
 * @swagger
 * tags:
 *   name: Healthcheck
 *   description: Healthcheck routes
 */
app.use("/api/v1/healthcheck", healthcheckRouter);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth routes
 */
app.use("/api/v1/auth", authRouter);
/**
 * @swagger
 * tags:
 *   name: Brand
 *   description: Brand create, get and delete routes
 */
app.use("/api/v1/brand", brandRouter);
/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service create, get and delete routes
 */
app.use("/api/v1/service", serviceRouter);
/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat create, get and delete routes
 */
app.use("/api/v1/chat", chatRouter);
/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Message sent routes and get all 
 */
app.use("/api/v1/message", messageRouter);

app.get("/", (req, res) => {
  res.send(
    '<h1>Home</h1><a href="http://localhost:8000/api/v1/auth/google">Login with Google</a>'
  );
});

export { app, server };
