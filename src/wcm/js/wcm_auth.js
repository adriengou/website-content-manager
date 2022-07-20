async function auth(isLogin) {
  console.log(form.submit);
  let formData = new FormData(form);
  for (const entry of formData.entries()) {
    console.log(entry);
  }

  const url = "/wcm";
  const password = passwordInput.value;

  isLoginInput.value = isLogin;

  const obj = {
    password: password,
    isLogin: isLogin,
    js: true,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(url, options);
  let data = await response.json();
  console.log(data);

  if (data.result) {
    document.createElement("form").submit.call(form);
  } else {
    if (!isLogin) {
      errorMsg.textContent = "Mot de passe déja crée !";
    } else {
      errorMsg.textContent = "Mauvais mot de passe !";
    }

    errorMsg.classList.add("hidden");
    setTimeout(() => {
      errorMsg.classList.remove("hidden");
    }, 500);
  }
}

const passwordInput = document.querySelector("#password");
const registerBtn = document.querySelector("#register");
const loginBtn = document.querySelector("#login");
const isLoginInput = document.querySelector("#isLogin");
const form = document.querySelector("#auth_form");
const errorMsg = document.querySelector("#error");

registerBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  await auth(false);
});

loginBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  await auth(true);
});

//getRequest();
//postRequest();
//putRequest();
//register();
//login();
