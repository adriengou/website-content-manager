import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Root path of the project
const ROOT_PATH = path.join(__dirname, "../");

//Port listened by the server
const PORT = 3000;

//Path to website directory
const WEBSITE_PATH = path.join(ROOT_PATH, "src/website");
const WEBSITE_PAGES_PATH = path.join(WEBSITE_PATH, "pages");
const WEBSITE_CSS_PATH = path.join(WEBSITE_PATH, "css");
const WEBSITE_JS_PATH = path.join(WEBSITE_PATH, "js");
const WEBSITE_ASSETS_PATH = path.join(WEBSITE_PATH, "assets");

//Path to WCM directory
const WCM_PATH = path.join(ROOT_PATH, "src/wcm");
const WCM_PAGES_PATH = path.join(WCM_PATH, "pages");
const WCM_CSS_PATH = path.join(WCM_PATH, "css");
const WCM_JS_PATH = path.join(WCM_PATH, "js");
const WCM_ASSETS_PATH = path.join(WCM_PATH, "assets");

//Path to WCM password
const WCM_PASSWORD_PATH = path.join(ROOT_PATH, "password.txt");

console.log(ROOT_PATH, PORT);

const config = {
  ROOT_PATH,
  PORT,

  WEBSITE_PATH,
  WEBSITE_PAGES_PATH,
  WEBSITE_CSS_PATH,
  WEBSITE_JS_PATH,
  WEBSITE_ASSETS_PATH,

  WCM_PATH,
  WCM_PAGES_PATH,
  WCM_CSS_PATH,
  WCM_JS_PATH,
  WCM_ASSETS_PATH,
};

for (const opt in config) {
  process.env[opt] = config[opt];
}
