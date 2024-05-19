import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GeoProvider } from "./libs";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GeoProvider baseUri="http://localhost:8080/geoserver">
      <App />
    </GeoProvider>
  </React.StrictMode>
);
