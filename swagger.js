import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Esay Menu",
    description: "description",
  },
  host: "localhost:8000"
};

const outputFile = "./swagger.json";
const routes = ["./src/routes/*.routes.js"];

swaggerAutogen(outputFile, routes, doc);
