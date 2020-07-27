import React from "react";
import ReactDOM from "react-dom";
import App from "./Basic.routing";
// import Nested from "./Nested.routing";
import * as serviceWorker from "./serviceWorker";

import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  composeWithDevTools(),
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
