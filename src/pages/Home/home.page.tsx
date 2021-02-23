import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Typography, Row, Col } from "antd";
import { Divider, Container, SocialButtons } from "@components";

const { Title, Text } = Typography;

type ProfessionalExperience = {
  job: string;
  date: string;
  company: string;
  description: Array<string>;
};

type Educations = {
  course: string;
  date: string;
  school: string;
};

type Certificates = {
  course: string;
  date: string;
  description: string;
};

type Awards = {
  award: string;
  date: string;
  description: string;
};

const CurriculumContainer = styled.div`
  padding: 50px 40px;
  background-color: #fff;
  .curriculum {
    &__section {
      margin-bottom: 1rem;
    }
    &__icons {
      display: flex;
      gap: 10px;
      margin-bottom: 2rem;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &__header-block {
      margin-bottom: 20px;
    }
    &__header {
      display: block;
      font-size: 1.3rem;
    }
    &__subheader {
      font-size: 1em;
      color: #8c8c8c;
    }
    &__date {
      font-weight: bold;
      font-size: 1.2rem;
    }
    &__list {
      padding-left: 20px;
      font-size: 1rem;
    }
  }
`;

export const Home = () => {
  const { t } = useTranslation();
  const professionalExperiences: Array<ProfessionalExperience> = t(
    "professionalExperiences",
    {
      returnObjects: true,
    }
  );
  const educations: Array<Educations> = t("educations", {
    returnObjects: true,
  });
  const certificates: Array<Certificates> = t("certificates", {
    returnObjects: true,
  });
  const awards: Array<Awards> = t("awards", {
    returnObjects: true,
  });

  return (
    <Container>
      <CurriculumContainer>
        <Row align="middle">
          <Col xs={24} md={12}>
            <Col md={24}>
              <Title className="authorName">Matheus Hanssen</Title>
            </Col>
            <Col md={24} className="curriculum__icons">
              <SocialButtons curriculumButton />
              {/* <Button type="primary" shape="circle" icon={<SearchOutlined />} /> */}
            </Col>
          </Col>
        </Row>
        <Row align="middle">
          <Col md={24}>
            <Text>{t("summaryText")}</Text>
          </Col>
        </Row>
        <Divider>{t("professionalExperience")}</Divider>
        {professionalExperiences.map((professionalExperience, index) => {
          const { job, company, date, description } = professionalExperience;
          return (
            <Row key={`professional-${index}`} className="curriculum__section">
              <Col className="curriculum__header-block" xs={24} md={12}>
                <Text className="curriculum__header">{job}</Text>
                <Text className="curriculum__subheader">{company}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text
                  className="curriculum__date"
                  style={{ textAlign: "end", display: "block" }}
                >
                  {date}
                </Text>
              </Col>
              <Col md={24}>
                <ul className="curriculum__list">
                  {description.map((desc: string, indexDesc) => (
                    <li key={`desc-${indexDesc}`}>{desc}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          );
        })}
        <Divider>{t("education")}</Divider>
        {educations.map((education, index) => {
          const { course, date, school } = education;
          return (
            <Row key={`education-${index}`} className="curriculum__section">
              <Col className="curriculum__header-block" xs={24} md={12}>
                <Text className="curriculum__header">{course}</Text>
                <Text className="curriculum__subheader">{school}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text
                  className="curriculum__date"
                  style={{ textAlign: "end", display: "block" }}
                >
                  {date}
                </Text>
              </Col>
            </Row>
          );
        })}
        <Divider>{t("certificate")}</Divider>
        {certificates.map((certificate, index) => {
          const { course, date, description } = certificate;
          return (
            <Row key={`certificate-${index}`} className="curriculum__section">
              <Col className="curriculum__header-block" xs={24} md={12}>
                <Text className="curriculum__header">{course}</Text>
                <Text className="curriculum__subheader">{description}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text
                  className="curriculum__date"
                  style={{ textAlign: "end", display: "block" }}
                >
                  {date}
                </Text>
              </Col>
            </Row>
          );
        })}
        <Divider>{t("award")}</Divider>
        {awards.map((aw, index) => {
          const { award, date, description } = aw;
          return (
            <Row key={`aw-${index}`} className="curriculum__section">
              <Col className="curriculum__header-block" xs={24} md={12}>
                <Text className="curriculum__header">{award}</Text>
                <Text className="curriculum__subheader">{description}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text
                  className="curriculum__date"
                  style={{ textAlign: "end", display: "block" }}
                >
                  {date}
                </Text>
              </Col>
            </Row>
          );
        })}
      </CurriculumContainer>
    </Container>
  );
};
