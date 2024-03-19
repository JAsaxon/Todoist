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
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);
