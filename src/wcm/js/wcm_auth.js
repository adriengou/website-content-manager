async function getRequest() {
  let response = await fetch("/get");
  let data = await response.text();
  console.log(data);
}

async function postRequest() {
  const options = {
    method: "POST",
    body: JSON.stringify({ msg: "coucou" }),
    headers: {
      //Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/post", options);
  let data = await response.text();
  console.log(JSON.parse(data));
}

async function putRequest() {
  const obj = {
    fileName: "putFile.md",
    content: "# This is a file created by a PUT request from the client",
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch("/put", options);
  let data = await response.text();
  console.log(JSON.parse(data));
}

async function register(user, pass) {
  const url = "/register";

  const obj = {
    username: user,
    password: pass,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(url, options);
  let data = await response.text();
  console.log(JSON.parse(data));
}

async function login(user, pass) {
  const url = "/login";

  const obj = {
    username: user,
    password: pass,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(url, options);
  let data = await response.text();
  console.log(JSON.parse(data));
}

//getRequest();
//postRequest();
//putRequest();
//register();
//login();

console.log(Date.now() / 1000);
