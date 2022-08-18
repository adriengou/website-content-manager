// import config from "../config/config.js";
import path from "path";
import fh from "../modules/file_handler.js";

const config = process.env;

async function getPagesName() {
  const dirPath = config.WEBSITE_PAGES_PATH;
  let pageNames = JSON.stringify(await fh.getFilesInDir(dirPath));
  return pageNames;
}

async function updatePage(fileName, content) {
  const filePath = path.join(config.WEBSITE_PAGES_PATH, `${fileName}.html`);
  await fh.write(filePath, content);
}

export default { getPagesName, updatePage };
