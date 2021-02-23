import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { FaLinkedinIn, FaGithub, FaFileDownload } from "react-icons/fa";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

type SocialButtonsProps = {
  curriculumButton?: boolean;
};

export const SocialButtons: React.FC<SocialButtonsProps> = ({
  curriculumButton = false,
}) => {
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
      {curriculumButton && (
        <Button
          size="large"
          type="primary"
          shape="circle"
          onClick={() => window.open("https://github.com/mathanssen")}
          icon={<FaFileDownload size="1.5rem" />}
        />
      )}
    </ButtonWrapper>
  );
};
