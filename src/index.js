import dotenv from "dotenv";
import { app, server } from "./app.js";
import connectDB from "./db/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../swagger.json" with { type: "json" };
import { setupSocket } from "./socket.js";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed", err);
  });

setupSocket(server);