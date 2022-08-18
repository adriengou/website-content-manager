import multer from "multer";
const config = process.env;

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

export default imgUpload;
