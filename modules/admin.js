import crypto from "crypto";
import path from "path";

const PATH = process.env.PATH;
const fh = await import(`${PATH}/modules/fileHandler.js`);
const PasswordPath = path.join(PATH, "/wcm/password.txt");

async function getPassword() {
  let r = await fh.exists(PasswordPath);

  if (r) {
    let data = await fh.read(PasswordPath);
    return data;
  } else {
    return false;
  }
}

async function setPassword(password) {
  await fh.write(PasswordPath, password);
}

async function register(password) {
  // load password.json file
  let storedPassword = await getPassword();

  // check if the user is not already registered
  if (setPassword) {
    return false;
  }

  // hash the password
  let hashedPassword = password; // <-- add the hashing here

  // write the users object back to users.json
  await setPassword(hashedPassword);
  return true;
}

async function login(password) {
  // load password.json file
  let storedPassword = await getPassword();

  // hash the password
  let hashedPassword = password; // <-- add the hashing here

  console.log(`
    storedPassword: -${typeof storedPassword}-
    Hashed Password: -${typeof hashedPassword}-
  `);

  // compare the sent password with the stored password
  if (hashedPassword === storedPassword) {
    console.log("GOOD PASSWORD");
    return true; //<-- return something instead
  } else {
    console.log("WRONG PASSWORD");
    return false;
  }
}

export { register, login };
