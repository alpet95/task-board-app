/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// === STORE -------------------------------
import store from "./app/store";

// === STYLES ------------------------------
import "./styles/fonts.css";
import "./styles/index.css";

// === COMPONENTS --------------------------
import App from "./App";

/* =======================================
                    ROOT                     
========================================== */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
