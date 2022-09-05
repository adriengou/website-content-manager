import { Router } from "express";
import wcm from "../modules/wcm.js";
import path from "path";
import imgUpload from "../middlewares/file_upload_middleware.js";
import express from "express";
import { nextTick } from "process";
import fh from "../modules/file_handler.js";

const config = process.env;
const router = Router();

//GET WCM
router.get("/", function (req, res) {
  console.log("test");
  res.sendFile(path.join(config.WCM_PAGES_PATH, "wcm_panel.html"));
});

//WCM get pages name
router.get("/pages", async function (req, res) {
  if (!(await wcm.checkPassword(req.body.password))) {
    res.send(false);
    return false;
  }

  const filesNames = await wcm.getPagesName();
  res.send(filesNames);
});

//WCM POST update page
router.post("/modif", async function (req, res) {
  if (!(await wcm.checkPassword(req.body.password))) {
    res.send(false);
    return false;
  }

  console.log("--------------Modif send POST request---------------");
  console.log(`Request body:\n${JSON.stringify(req.body)}`);
  await wcm.updatePage(req.body.fileName, req.body.content);
  res.send(req.body);
});

router.post("/upload", imgUpload.single("files"), async function (req, res) {
  if (!(await wcm.checkPassword(req.body.password))) {
    res.send(false);
    return false;
  }

  console.log(req.file);
  res.send(true);
});

router.post("/register", async function (req, res) {
  let body = req.body;
  let password = body.password;
  console.log({ password });

  const result = await wcm.createPassword(password);
  console.log({ result });
  res.send(result);
});

router.post("/login", async function (req, res) {
  let body = req.body;
  let password = body.password;

  const result = await wcm.checkPassword(password);
  console.log({ result });
  res.send(result);
});

//This serves WCM static js
router.use("/js", express.static(config.WCM_JS_PATH));

//This serves WCM static css
router.use("/css", express.static(config.WCM_CSS_PATH));

export default router;
