import React from "react";

import styled from "styled-components";
import { Layout, Menu } from "antd";
import {
  IdcardOutlined,
  LineChartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
`;

export const Navbar = () => {
  const { t } = useTranslation();
  const { Sider } = Layout;

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <Logo />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<IdcardOutlined />}>
          {t("curriculum")}
        </Menu.Item>
        <Menu.Item key="2" icon={<LineChartOutlined />}>
          {t("predictions")}
        </Menu.Item>
        <Menu.Item key="3" icon={<BarChartOutlined />}>
          {t("rankings")}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
