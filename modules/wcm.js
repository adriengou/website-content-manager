import config from "../config/config.js";
import path from "path";

const fh = await import(path.join(config.ROOT_PATH, "modules/fileHandler.js"));

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
