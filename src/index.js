import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../swagger.json" assert {type: "json"};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed", err);
  });
