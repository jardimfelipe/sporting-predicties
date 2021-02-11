import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n/config";
import "antd/dist/antd.less";

import { Header } from "@components";
import { Layout, Typography } from "antd";

const { Footer, Content } = Layout;
ReactDOM.render(
  <React.StrictMode>
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <Header />
        <Content>
          <App />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </React.StrictMode>,
  document.getElementById("root")
);
