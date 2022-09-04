// import config from "../config/config.js";
import path from "path";
import fh from "../modules/file_handler.js";
import crypto from "crypto";

const config = process.env;

function hashPassword(password) {
  let hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  return hashedPassword;
}

async function getPagesName() {
  const dirPath = config.WEBSITE_PAGES_PATH;
  let pageNames = JSON.stringify(await fh.getFilesInDir(dirPath));
  return pageNames;
}

async function updatePage(fileName, content) {
  const filePath = path.join(config.WEBSITE_PAGES_PATH, `${fileName}.html`);
  await fh.write(filePath, content);
}

async function createPassword(password) {
  const path = config.WCM_PASSWORD_PATH;
  if (await fh.exists(path)) {
    return false;
  }

  let hashedPassword = hashPassword(password);
  await fh.write(path, hashPassword);

  console.log(hashedPassword);
  return hashedPassword;
}

async function checkPassword(password) {
  const path = config.WCM_PASSWORD_PATH;

  if (!(await fh.exists(path))) {
    return false;
  }

  const savedPassword = await fh.read(path);

  return savedPassword === password;
}

export default { getPagesName, updatePage, createPassword };
