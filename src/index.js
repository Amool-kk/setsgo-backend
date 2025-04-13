import dotenv from "dotenv";
import { app, server } from "./app.js";
import connectDB from "./db/index.js";
import { setupSocket } from "./socket.js";
import swaggerDocs from "./utils/swagger.js";

const port = process.env.PORT || 8000;

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
    swaggerDocs(app, port);
  })
  .catch((err) => {
    console.log("Mongo db connection failed", err);
  });

setupSocket(server);
