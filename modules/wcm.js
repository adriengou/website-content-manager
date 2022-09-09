// import config from "../config/config.js";
import fh from "../modules/file_handler.js";
import crypto from "crypto";
import path from "path";

const config = process.env;

const templatePath = path.join(config.WCM_PRODUCTS_path, "template.json");
const templateProduct = JSON.parse(await fh.read(templatePath));

function hashPassword(password) {
  let hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  return hashedPassword;
}

function randomString(size = 21) {
  return crypto.randomBytes(size).toString("base64").slice(0, size);
}

async function getPagesName() {
  const dirPath = config.WEBSITE_PAGES_PATH;
  let pageNames = JSON.stringify(await fh.getFilesInDir(dirPath));
  return pageNames;
}

async function updatePage(fileName, content) {
  const filePath = path.join(config.WEBSITE_PAGES_PATH, `${fileName}.html`);
  return await fh.write(filePath, content);
}

async function createPassword(password) {
  const path = config.WCM_PASSWORD_PATH;
  if (await fh.exists(path)) {
    return false;
  }

  let hashedPassword = hashPassword(password);
  await fh.write(path, hashedPassword);
  console.log(`creating password file at path: ${path}`);

  console.log(hashedPassword);
  return hashedPassword;
}

async function checkPassword(password, hash = true) {
  const path = config.WCM_PASSWORD_PATH;

  if (!(await fh.exists(path))) {
    return false;
  }
  let hashedPassword;
  const savedPassword = await fh.read(path);

  hash
    ? (hashedPassword = hashPassword(password))
    : (hashedPassword = password);

  if (savedPassword === hashedPassword) {
    return { valid: true, hash: hashedPassword };
  }
  return { valid: false };
}

async function getProductsJson() {
  const productsPath = path.join(config.WCM_PRODUCTS_path, "products.json");
  return JSON.parse(await fh.read(productsPath));
}

function matchProduct(query, product, ignore = false) {
  // for (const savedProduct of list) {
  //   let productsMatch = true;
  //   for (const key in savedProduct) {
  //     if (ignore && key === "id") {
  //       continue;
  //     }
  //     // console.log(savedProduct[key], product[key]);
  //     if (savedProduct[key] !== product[key]) {
  //       productsMatch = false;
  //     }
  //   }
  //   if (productsMatch) {
  //     return true;
  //   }
  // }

  for (const key in query) {
    if (query[key] !== product[key]) {
      return false;
    }
  }

  return true;
}

async function findProducts(query, index = false) {
  let products = await getProductsJson();
  let productsFound = [];

  if (query === "ALL") {
    if (index) {
      for (let i = 0; i < products.length; i++) {
        productsFound.push(i);
      }
    } else {
      return products;
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (matchProduct(query, products[i])) {
        index ? productsFound.push(i) : productsFound.push(products[i]);
      }
    }
  }

  return productsFound;
}

async function createProduct(product) {
  const productsPath = path.join(config.WCM_PRODUCTS_path, "products.json");
  let products = await getProductsJson();
  let newProduct = Object.create(templateProduct);

  for (const key in templateProduct) {
    if (product[key]) {
      newProduct[key] = product[key];
    } else {
      newProduct[key] = "";
    }
  }

  if (matchProduct(products, product, true)) {
    return false;
  }

  newProduct.id = randomString();
  products.push(newProduct);
  console.log(products);
  return await fh.write(productsPath, JSON.stringify(products));
}

async function updateProduct(query, newData) {
  const productsPath = path.join(config.WCM_PRODUCTS_path, "products.json");
  let products = await getProductsJson();

  let indexesFound = await findProducts(query, true);

  let changedProducts = [];
  for (const index of indexesFound) {
    for (const key in newData) {
      products[index][key] = newData[key];
    }
    changedProducts.push(products[index]);
  }
  console.log({ indexesFound, changedProducts });
  await fh.write(productsPath, JSON.stringify(products));
  return changedProducts;
}

async function deleteProducts(query) {
  const productsPath = path.join(config.WCM_PRODUCTS_path, "products.json");
  let products = await getProductsJson();

  let indexesFound = await findProducts(query, true);
  let deletedProducts = 0;

  for (let index = indexesFound.length - 1; index >= 0; index--) {
    products.splice(indexesFound[index], 1);
    deletedProducts++;
  }

  await fh.write(productsPath, JSON.stringify(products));
  return { deleted: deletedProducts };
}

export default {
  getPagesName,
  updatePage,
  createPassword,
  checkPassword,
  findProducts,
  createProduct,
  updateProduct,
  deleteProducts,
};
