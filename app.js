import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";

// import livereload from "livereload";
// import connectLivereload from "connect-livereload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
process.env.PATH = __dirname;

const fh = await import(`${__dirname}/modules/fileHandler.js`);
const admin = await import(`${__dirname}/modules/admin.js`);

const app = express();
const port = 3000;

// // open livereload high port and start to watch public directory for changes
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, "src"));

// // ping browser on Express boot, once browser has reconnected and handshaken
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });

// // monkey patch every served HTML so they know of changes
// app.use(connectLivereload());

async function renderWebsite(path) {
  const filePath = `${__dirname}/src/website/pages/${path}.html`;
  let page = await fh.read(filePath);
  return page;
}

async function renderWcm(path) {
  const filePath = `${__dirname}/src/wcm/pages/${path}.html`;
  let page = await fh.read(filePath);
  return page;
}

async function getPagesName() {
  const dirPath = `${__dirname}/src/website/pages`;
  let pageNames = JSON.stringify(await fh.getFilesInDir(dirPath));
  return pageNames;
}

async function updatePage(pageName, content) {
  const filePath = `${__dirname}/src/website/pages/${pageName}.html`;
  await fh.write(filePath, content);
}

//Json middleware
app.use(express.json());

//forms middleware
app.use(express.urlencoded({ extended: true }));

//File upload middleware
app.use(fileUpload());

//Index.html GET request
app.get("/", async function (req, res) {
  res.send(await renderWebsite("index"));
});

app.get("/about", async function (req, res) {
  res.send(await renderWebsite("about"));
});

app.get("/wcm", async function (req, res) {
  // res.send(await renderWcm("wcm_auth"));
  res.send(await renderWcm("wcm_panel")); //CHANGE BACK TO "wcm_auth" WHEN DONE
});

//Admin register POST request
app.post("/wcm", async function (req, res) {
  console.log("--------------Admin register POST request---------------");
  console.log(`Request body:\n${JSON.stringify(req.body)}`);

  let password = req.body.password;

  let result;

  if (req.body.isLogin) {
    result = await admin.login(password);
    console.log("Login request");
  } else {
    result = await admin.register(password);
    console.log("Register request");
  }

  console.log("RESULT: " + result);

  if (req.body.js) {
    console.log("fetch request");
    res.send({
      body: req.body,
      result: result,
    });
  } else if (result) {
    console.log("form request");
    res.send(await renderWcm("wcm_panel"));
  }
});

//WCM get pages name
app.get("/wcm/pages", async function (req, res) {
  const filesNames = await getPagesName();
  res.send(filesNames);
});

//WCM POST update page
app.post("/wcm/modif", async function (req, res) {
  console.log("--------------Modif send POST request---------------");
  console.log(`Request body:\n${JSON.stringify(req.body)}`);
  await updatePage(req.body.fileName, req.body.content);
  res.send(req.body);
});

app.post("/wcm/upload", function (req, res) {
  console.log(req.files);
  console.log("--------------Upload send POST request---------------");
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log(req.files);

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;
  let fileName = req.giles.file.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(
    `${__dirname}/src/website/assets/images/${fileName}`,

    function (err) {
      if (err) return res.status(500).send(err);

      res.send(fileName);
    }
  );
});

//
app.get("/about", async function (req, res) {
  res.send(await renderWebsite("about"));
});

app.get("/contact", async function (req, res) {
  res.send(await renderWebsite("contact"));
});

//This serves Website static js
app.use("/website/js/", express.static(`${__dirname}/src/website/js`));

//This serves Website static js
app.use("/website/css", express.static(`${__dirname}/src/website/css`));

//This serves Website static js
app.use("/wcm/js", express.static(`${__dirname}/src/wcm/js`));

//This serves Website static js
app.use("/wcm/css", express.static(`${__dirname}/src/wcm/css`));

//This serves Website static js
app.use("/website/assets", express.static(`${__dirname}/src/website/assets`));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
