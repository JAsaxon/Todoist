import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/custom.scss";
import "./styles/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { HashRouter } from "react-router-dom";
//* apparently github pages doesn't work with browser router so HashRouter
//* Is needed so it doesn't bug out, probably could be reverted if we ever move
//* to another hosting provider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <App />
      </LocalizationProvider>
    </HashRouter>
  </React.StrictMode>
);
