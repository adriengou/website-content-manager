import "./config/config.js";
const config = process.env;

import express from "express";
import wcmRouter from "./routes/wcm_routes.js";
import websiteRouter from "./routes/website_routes.js";
import bodyParser from "body-parser";

const app = express();

//Json middleware
app.use(express.json());

//forms middleware
app.use(express.urlencoded({ extended: true }));

app.use("/", websiteRouter);
app.use("/wcm", wcmRouter);

app.listen(config.PORT, function () {
  console.log(`Example app listening on port ${config.PORT}!`);
});
