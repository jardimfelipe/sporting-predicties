import React from "react";
import styled from "styled-components";

import { Layout, Image, Select, Menu } from "antd";
import {
  IdcardOutlined,
  LineChartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Header: AntdHeader } = Layout;
const { Option } = Select;

const LanguageSelect = styled(Select)`
  &:focus,
  &:active {
    border: none;
  }
  width: 60px;
  margin-left: 15px;
  background-color: transparent;
  .ant-select-selector {
    height: 50px !important;
    border: none !important;
    background-color: transparent !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    .ant-select-selection-item {
      line-height: 0;
    }
  }
  .ant-select-arrow {
    right: 0;
    color: #fff;
  }
`;

export const Header = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const handleChange = (value: any) => {
    i18n.changeLanguage(value);
  };
  return (
    <AntdHeader
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Menu theme="dark" mode="horizontal">
        <Menu.Item
          onClick={() => history.push("/")}
          key="1"
          icon={<IdcardOutlined />}
        >
          {t("curriculum")}
        </Menu.Item>
        <Menu.Item key="2" icon={<LineChartOutlined />}>
          {t("predictions")}
        </Menu.Item>
        <Menu.Item
          onClick={() => history.push("/rankings")}
          key="3"
          icon={<BarChartOutlined />}
        >
          {t("rankings")}
        </Menu.Item>
      </Menu>
      <LanguageSelect defaultValue={"en"} onChange={handleChange}>
        <Option value="pt">
          <Image
            preview={false}
            width={"100%"}
            src="https://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg"
          />
        </Option>
        <Option value="en">
          <Image
            preview={false}
            width={"100%"}
            src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
          />
        </Option>
      </LanguageSelect>
    </AntdHeader>
  );
};
