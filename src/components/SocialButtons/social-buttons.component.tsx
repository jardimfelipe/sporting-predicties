import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

export const SocialButtons = () => {
  return (
    <ButtonWrapper>
      <Button
        size="large"
        type="primary"
        shape="circle"
        onClick={() =>
          window.open("https://www.linkedin.com/in/matheus-hanssen")
        }
        icon={<FaLinkedinIn size="1.5rem" />}
      />
      <Button
        size="large"
        type="primary"
        shape="circle"
        onClick={() => window.open("https://github.com/mathanssen")}
        icon={<FaGithub size="1.5rem" />}
      />
    </ButtonWrapper>
  );
};
