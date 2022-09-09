import session from "./session.js";
const BASE_URL = "/wcm";

async function sendRequest(url, options) {
  const URL = BASE_URL + url;
  // console.log({ URL, options });

  let result;

  try {
    result = await fetch(URL, options);
  } catch (error) {
    result = false;
    console.log(error);
  }

  return result;
}

async function sendPassword(url, password) {
  const OPTIONS = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      password: password,
    }),
  };

  let data = await sendRequest(url, OPTIONS);
  return data;
}

let requests = {};

requests.register = async function (password) {
  const URL = "/register";
  const result = await (await sendPassword(URL, password)).json();
  if (result) {
    session.addData({ password: result });
  }
  return result;
};

requests.login = async function (password) {
  const URL = "/login";
  const result = await (await sendPassword(URL, password)).json();
  if (result.valid) {
    console.log("storing in session");
    session.addData({ password: result.hash });
  }
  return result;
};

requests.getPages = async function () {
  //get password in session
  const PASSWORD = session.getData("password");

  const URL = "/pages";

  const OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      password: PASSWORD,
    },
  };

  let data = await sendRequest(URL, OPTIONS);
  return await data.json();
};

requests.sendPage = async function (name, html) {
  //get password in session
  const PASSWORD = session.getData("password");

  const URL = "/pages";

  const OPTIONS = {
    method: "PUT",
    headers: {
      "Content-Type": "text/plain",
      password: PASSWORD,
      filename: name,
    },

    body: html,
  };

  let data = await sendRequest(URL, OPTIONS);
  return await data.json();
};

requests.sendImage = async function (file, oldFilePath) {
  //get password in session
  const PASSWORD = session.getData("password");
  const URL = "/upload";

  let formData = new FormData();
  formData.append("files", file);
  formData.append("oldFilePath", oldFilePath);

  const OPTIONS = {
    method: "POST",
    headers: {
      password: PASSWORD,
    },

    body: formData,
  };

  let data = await sendRequest(URL, OPTIONS);
  return await data.json();
};

requests.getProducts = async function (query) {
  //get password in session
  const PASSWORD = session.getData("password");
  const URL = "/products/search";
  const BODY = {
    query: query,
  };

  const OPTIONS = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      password: PASSWORD,
    },
    body: JSON.stringify(BODY),
  };

  console.log(URL);
  let data = await sendRequest(URL, OPTIONS);
  return await data.json();
};

requests.updateProducts = async function (query, newData) {
  //get password in session
  const PASSWORD = session.getData("password");
  const URL = "/products";
  const BODY = {
    query: query,
    newData: newData,
  };

  const OPTIONS = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      password: PASSWORD,
    },
    body: JSON.stringify(BODY),
  };

  console.log(URL);
  let data = await sendRequest(URL, OPTIONS);
  return await data.json();
};

await requests.login("test");
console.log(await requests.updateProducts("ALL"));

export default requests;

/*
GET A FILE FROM THE USER COMPUTER
for the click event listener, replace document by the image the user click

document.addEventListener("click", function () {
  let fileInput = document.createElement("INPUT");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("name", "file");
  fileInput.click();

  fileInput.addEventListener("change", async function (e) {
    console.log(fileInput.files[0]);
    console.log(
      await requests.sendImage(fileInput.files[0], "oldimagetest.jpg")
    );
  });
});



SEARCH A PRODUCT
here is the product query example

{
  "nom": "",
  "photo": "",
  "description": "",
  "prix": "",
  "entretien": "",
  "personalisation": "",
  "couleur": "",
  "collection": ""
}

exemples:
you want to search by name:
{
  nom: "name of the products"
}

you want to search by name, price and color
{
  "nom": "name of the product",
  "prix": 3,
  "couleur": "blue",
}
*/
