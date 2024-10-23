import swaggerAutogen from "swagger-autogen";
import { BASE_HOST, PORT } from "./src/constants.js";

console.log(BASE_HOST);

const doc = {
  info: {
    title: "Esay Menu",
    description: "description",
  },
  host: `${BASE_HOST}:${PORT}`,
};

const outputFile = "./swagger.json";
const routes = ["./src/routes/*.routes.js"];

swaggerAutogen(outputFile, routes, doc);
