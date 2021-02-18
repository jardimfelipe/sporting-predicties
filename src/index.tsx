import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n/config";
import "antd/dist/antd.less";
import { Layout } from "antd";

ReactDOM.render(
  <React.StrictMode>
    <Layout style={{ height: "100%" }}>
      <App />
    </Layout>
  </React.StrictMode>,
  document.getElementById("root")
);
