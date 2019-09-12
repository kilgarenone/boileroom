import { h, render } from "preact";
// import { Provider } from "unistore/preact";
import { App } from "./components/App";
// import store from "./redux/store";
// import "./css/index.scss";

let root;

function init() {
  root = render(<App />, document.getElementById("app"), root);
}

if (module.hot) {
  // eslint-disable-next-line global-require
  require("preact/debug");

  // note: enabling this breaks refreshing in a route
  module.hot.accept("./components/App", () => requestAnimationFrame(init));
}

init();
