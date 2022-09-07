import session from "./session.js";
const BASE_URL = "/wcm";

async function sendRequest(url, options) {
  const URL = BASE_URL + url;
  console.log({ URL, options });

  let result;

  try {
    result = await fetch(URL, options);
  } catch (error) {
    result = false;
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
  const result = (await sendPassword(URL, password)).text();
  return result;
};

requests.login = async function (password) {
  const URL = "/login";
  const result = (await sendPassword(URL, password)).json();
  if (result.valid) {
  }
  return result;
};

console.log(await requests.login("testaa"));

export default requests;
