import React from "react";
import styled from "styled-components";

import { Layout, Typography } from "antd";
import { SocialButtons } from "@components";

const { Footer: AntdFooter } = Layout;
const { Text } = Typography;
const FooterWrapper = styled(AntdFooter)`
  background-color: #001529;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    color: #fff;
  }
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <Text>Matheus Hanssen - Todos os direitos reservados</Text>
      <SocialButtons />
    </FooterWrapper>
  );
};
