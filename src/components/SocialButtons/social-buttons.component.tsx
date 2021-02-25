import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { FaLinkedinIn, FaGithub, FaFileDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const handleClick = () => {
    i18n.language === "en"
      ? window.open(
          "https://documents-mh.s3.us-east-2.amazonaws.com/cv-matheushanssen-en.pdf"
        )
      : window.open(
          "https://documents-mh.s3.us-east-2.amazonaws.com/cv-matheushanssen-pt.pdf"
        );
  };
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
          onClick={() => handleClick()}
          icon={<FaFileDownload size="1.5rem" />}
        />
      )}
    </ButtonWrapper>
  );
};
