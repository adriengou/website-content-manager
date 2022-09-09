import { Router } from "express";
import wcm from "../modules/wcm.js";
import path from "path";
import imgUpload from "../middlewares/file_upload_middleware.js";
import express from "express";
const config = process.env;
const router = Router();

//GET WCM

//AUTH

async function auth(req, res, next) {
  const password = req.headers.password || "none";
  const result = await wcm.checkPassword(password, false);
  if (!result.valid) {
    res.send(false);
    return false;
  } else {
    next();
  }
}

router.post("/register", async function (req, res) {
  const password = req.body.password;
  console.log({ password });

  const result = await wcm.createPassword(password);
  console.log({ result });
  res.send(JSON.stringify(result));
});

router.post("/login", async function (req, res) {
  const password = req.body.password;

  const { valid, hash } = await wcm.checkPassword(password);
  res.send({ valid, hash });
});

router.get("/", function (req, res) {
  // console.log("test");
  res.sendFile(path.join(config.WCM_PAGES_PATH, "wcm.html"));
});

//This serves WCM static js
router.use("/js", express.static(config.WCM_JS_PATH));

//This serves WCM static css
router.use("/css", express.static(config.WCM_CSS_PATH));

router.use(auth);

//WCM get pages name
router.get("/pages", async function (req, res) {
  const filesNames = await wcm.getPagesName();
  res.send(filesNames);
});

//WCM POST update page
router.put("/pages", async function (req, res) {
  const fileName = req.headers.filename;
  const content = req.body;
  console.log({ fileName, content }, req.body);
  const result = await wcm.updatePage(fileName, content);
  console.log({ result });
  res.send(result);
});

router.post("/upload", imgUpload.single("files"), async function (req, res) {
  console.log(req.file);
  const file = req.file;
  const oldFilePath = req.body.oldFilePath;
  console.log({ file, oldFilePath });
  res.send(true);
});

//CREATE products
router.post("/products", async function (req, res) {
  const product = req.body.product;
  console.log({ product });
  const result = await wcm.createProduct(product);
  res.send(result);
});

//READ products
router.post("/products/search", async function (req, res) {
  const query = req.body.query;
  const products = await wcm.findProducts(query);
  res.send(products);
});

//UPDATE products
router.put("/products", async function (req, res) {
  const query = req.body.query;
  const newData = req.body.newData;
  const result = await wcm.updateProduct(query, newData);
  res.send(result);
});

//DELETE products
router.delete("/products", async function (req, res) {
  const query = req.body.query;
  const result = await wcm.deleteProducts(query);
  console.log(result);
  res.send(result);
});

export default router;
