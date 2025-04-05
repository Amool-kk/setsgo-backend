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

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/service", serviceRouter);

app.get("/", (req, res) => {
  res.send(
    '<h1>Home</h1><a href="http://localhost:8000/api/v1/auth/google">Login with Google</a>'
  );
});

export { app, server };
