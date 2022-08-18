import { Router } from "express";
import express from "express";

const config = process.env;
const router = Router();

//This serves Website static pages
router.use(
  "/",
  express.static(config.WEBSITE_PAGES_PATH, { extensions: ["html"] })
);

//This serves Website static js
router.use("/website/js/", express.static(config.WEBSITE_JS_PATH));

//This serves Website static css
router.use("/website/css", express.static(config.WEBSITE_CSS_PATH));

//This serves Website static assets
router.use("/website/assets", express.static(config.WEBSITE_ASSETS_PATH));

router.get("/test", function (req, res) {
  console.log(req.ip, req.socket.remoteAddress);
  res.send("bonjour");
});

export default router;
