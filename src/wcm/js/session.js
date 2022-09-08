let session = {};

session.addData = function (data) {
  for (const key in data) {
    sessionStorage.setItem(key, JSON.stringify(data[key]));
  }
};

session.getData = function (key) {
  let sessionString = sessionStorage.getItem(key);
  let data = JSON.parse(sessionString);
  return data;
};

session.getAllData = function () {
  let data = {};
  for (const key in sessionStorage) {
    if (key !== "length" && typeof sessionStorage[key] !== "function") {
      data[key] = JSON.parse(sessionStorage[key]);
    }
  }
  return data;
};

export default session;
