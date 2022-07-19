async function auth(isLogin) {
  const url = "/wcm/auth";
  const password = passwordInput.value;

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
    form.submit();
  } else {
    errorMsg.classList.add("hidden");
    setTimeout(() => {
      errorMsg.classList.remove("hidden");
    }, 500);
  }
}

const passwordInput = document.querySelector("#password");
const registerBtn = document.querySelector("#register");
const loginBtn = document.querySelector("#login");
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
