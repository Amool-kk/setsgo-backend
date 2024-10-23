import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const DB_NAME = "eazyMenu";
export const BASE_HOST = process.env.BASE_HOST;
export const BASE_URL = process.env.BASE_URL;
export const PORT = process.env.PORT;
