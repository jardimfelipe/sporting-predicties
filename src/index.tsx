import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n/config";
import "antd/dist/antd.less";

import { Header, Footer } from "@components";
import { Layout } from "antd";

const { Content } = Layout;
ReactDOM.render(
  <React.StrictMode>
    <Layout style={{ height: "100%" }}>
      <Header />
      <Content style={{ padding: "50px" }}>
        <App />
      </Content>
      <Footer />
    </Layout>
  </React.StrictMode>,
  document.getElementById("root")
);
