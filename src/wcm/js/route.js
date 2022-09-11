const VIEWS = document.querySelectorAll("[view]");

// document.addEventListener("click", function (e) {
//   let path = e.target.getAttribute("link");
//   if (path) {
//     route(path);
//   }
// });

function route(path) {
  for (const view of VIEWS) {
    if (view.getAttribute("view") === path) {
      view.classList.remove("hidden");
    } else {
      view.classList.add("hidden");
    }
  }
}

// async function route(path) {
//   // console.log(VIEWS);
//   let nextView;

//   switch (route) {
//     case "/pages":
//       break;

//     case "/modif":
//       break;

//     default:
//       break;
//   }

//   changeView(path);
// }

export default route;
