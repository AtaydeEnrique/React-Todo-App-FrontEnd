import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
