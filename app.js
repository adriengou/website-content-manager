import express from "express";
import path from "path";
import multer from "multer";
import config from "./config/config.js";
import wcm from "./modules/wcm.js";

const app = express();
const port = 3000;

//Json middleware
app.use(express.json());

//forms middleware
app.use(express.urlencoded({ extended: true }));

//multer middleware sort of
const imgPath = config.WEBSITE_ASSETS_PATH;

const imgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const imgUpload = multer({ storage: imgStorage });

//WCM get pages name
app.get("/wcm/pages", async function (req, res) {
  const filesNames = await wcm.getPagesName();
  res.send(filesNames);
});

//WCM POST update page
app.post("/wcm/modif", async function (req, res) {
  console.log("--------------Modif send POST request---------------");
  console.log(`Request body:\n${JSON.stringify(req.body)}`);
  await wcm.updatePage(req.body.fileName, req.body.content);
  res.send(req.body);
});

app.post("/wcm/upload", imgUpload.single("files"), async function (req, res) {
  console.log(req.body);
  console.log(req.file);
  res.json({ message: "Successfully uploaded files" });
});

//This serves Website static pages
app.use(
  "/",
  express.static(config.WEBSITE_PAGES_PATH, { extensions: ["html"] })
);

//This serves Website static js
app.use("/website/js/", express.static(config.WEBSITE_JS_PATH));

//This serves Website static css
app.use("/website/css", express.static(config.WEBSITE_CSS_PATH));

//This serves Website static assets
app.use("/website/assets", express.static(config.WEBSITE_ASSETS_PATH));

//This serves WCM panel static pages
app.get("/wcm", function (req, res) {
  res.sendFile(path.join(config.WCM_PAGES_PATH, "wcm_panel.html"));
});

//This serves WCM static js
app.use("/wcm/js", express.static(config.WCM_JS_PATH));

//This serves WCM static css
app.use("/wcm/css", express.static(config.WCM_CSS_PATH));

app.listen(port, function () {
  console.log(`Example app listening on port ${config.PORT}!`);
});
