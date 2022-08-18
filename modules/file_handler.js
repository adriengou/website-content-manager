import fs from "fs";
import pathModule from "path";

const fsPromises = fs.promises;

async function write(path, content) {
  // fs.writeFile(path, content, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return err;
  //   }
  //   // file written successfully
  // });

  try {
    await fs.promises.mkdir(pathModule.dirname(path), { recursive: true });
  } catch (err) {
    console.error("Error occured while creating directory!", err);
  }

  try {
    await fsPromises.writeFile(path, content);
  } catch (err) {
    console.error("Error occured while writing file!", err);
  }
}

async function read(path) {
  // fs.readFile(path, "utf8", (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return err;
  //   }
  //   return data;
  // });

  try {
    return await fsPromises.readFile(path, "utf-8");
  } catch (err) {
    console.error("Error occured while reading file!", err);
  }
}

async function exists(path) {
  try {
    await fsPromises.access(path);
    return true;
  } catch {
    return false;
  }
}

async function getFilesInDir(path) {
  try {
    const files = await fsPromises.readdir(path);
    return files;
  } catch (err) {
    console.error(err);
  }
}

async function mkdir(path) {
  try {
    await fs.promises.mkdir(pathModule.dirname(path), { recursive: true });
  } catch (err) {
    console.error("Error occured while creating directory!", err);
  }
}

export default { write, read, exists, getFilesInDir, mkdir };
