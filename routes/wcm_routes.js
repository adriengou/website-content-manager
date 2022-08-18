import { Router } from "express";
import wcm from "../modules/wcm.js";
import path from "path";
import imgUpload from "../middlewares/file_upload_middleware.js";
import express from "express";
import { nextTick } from "process";
import fh from "../modules/file_handler.js";

const config = process.env;
const router = Router();

//login page
router.get("/", function (req, res) {
  console.log("test");
  res.sendFile(path.join(config.WCM_PAGES_PATH, "wcm_panel.html"));
});

//WCM get pages name
router.get("/pages", async function (req, res) {
  const filesNames = await wcm.getPagesName();
  res.send(filesNames);
});

//WCM POST update page
router.post("/modif", async function (req, res) {
  console.log("--------------Modif send POST request---------------");
  console.log(`Request body:\n${JSON.stringify(req.body)}`);
  await wcm.updatePage(req.body.fileName, req.body.content);
  res.send(req.body);
});

router.post("/upload", imgUpload.single("files"), async function (req, res) {
  console.log(req.body);
  console.log(req.file);
  res.json({ message: "Successfully uploaded files" });
});

router.post("/register", function (req, res) {
  console.log(req.body);
  res.send("all good");
});

router.post("/login", function (req, res) {
  if (condition) {
  }
});

//This serves WCM static js
router.use("/js", express.static(config.WCM_JS_PATH));

//This serves WCM static css
router.use("/css", express.static(config.WCM_CSS_PATH));

export default router;
