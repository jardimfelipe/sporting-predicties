import React from "react";
import { useTranslation } from "react-i18next";

import { Button, Row, Col } from "antd";

export const Home = () => {
  const { t, i18n } = useTranslation();
  const x = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Row align="middle">
      <Col span={24}></Col>
    </Row>
  );
};
