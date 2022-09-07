const VIEWS = document.querySelectorAll("[view]");

async function router(route) {
  // console.log(VIEWS);
  let nextView;

  switch (route) {
    case "/pages":
      nextView = route;
      loadPageSect();
      break;

    case "/modif":
      nextView = route;
      break;

    default:
      nextView = route;
      break;
  }

  //hide all VIEWS to show the next one
  for (const view of VIEWS) {
    // console.log({ route }, view.getAttribute("view"), { nextView });
    if (view.getAttribute("view") === nextView) {
      view.classList.remove("hidden");
    } else {
      view.classList.add("hidden");
    }
    // console.log({ view });
  }
}

export default router;
