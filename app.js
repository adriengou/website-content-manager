import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
process.env.PATH = __dirname;

const fh = await import(`${__dirname}/modules/fileHandler.js`);
const admin = await import(`${__dirname}/modules/admin.js`);

const app = express();
const port = 3000;

async function renderWebsite(path) {
  path = `${__dirname}/src/website/pages/${path}.html`;
  let page = await fh.read(path);
  return page;
}

async function renderWcm(path) {
  path = `${__dirname}/src/wcm/pages/${path}.html`;
  let page = await fh.read(path);
  return page;
}

//Json middleware
app.use(express.json());

//Index.html GET request
app.get("/", async function (req, res) {
  res.send(await renderWebsite("index"));
});

app.get("/wcm", async function (req, res) {
  res.send(await renderWcm("wcm_auth"));
});

//Admin register POST request
app.post("/wcm/auth", async function (req, res) {
  console.log("--------------Admin register POST request---------------");
  console.log(req.body);

  let password = req.body.password;
  console.log(`Password: ${JSON.stringify(req.body)}`);

  let result;

  if (req.body.isLogin) {
    result = await admin.login(password);
  } else {
    result = await admin.register(password);
  }

  console.log("RESULT: " + result);

  if (req.body.js) {
    res.send({
      body: req.body,
      result: result,
    });
  } else if (result) {
    res.send(renderWcm("wcm_panel"));
  }
});

//This serves Website static js
app.use("/website/js/", express.static(`${__dirname}/src/website/js`));

//This serves Website static js
app.use("/website/css", express.static(`${__dirname}/src/website/css`));

//This serves Website static js
app.use("/wcm/js", express.static(`${__dirname}/src/wcm/js`));

//This serves Website static js
app.use("/wcm/css", express.static(`${__dirname}/src/wcm/css`));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
