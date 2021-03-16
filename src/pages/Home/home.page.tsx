import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { Typography, Row, Col } from "antd"
import { Divider, SocialButtons } from "@components"

const { Title, Text } = Typography

type ProfessionalExperience = {
  job: string
  date: string
  company: string
  description: Array<string>
}

type Educations = {
  course: string
  date: string
  school: string
}

type Certificates = {
  course: string
  date: string
  description: string
}

type Awards = {
  award: string
  date: string
  description: string
}

const CurriculumContainer = styled.div`
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
      @media screen and (max-width: 767px) {
        font-size: 1rem;
      }
    }
    &__subheader {
      font-size: 1em;
      color: #8c8c8c;
      @media screen and (max-width: 767px) {
        font-size: 0.8rem;
      }
    }
    &__date {
      font-weight: bold;
      font-size: 1.2rem;
      @media screen and (max-width: 767px) {
        font-size: 0.9rem;
        margin-top: 5px;
      }
    }
    &__list,
    &__inline-list {
      padding-left: 20px;
      font-size: 1rem;
      @media screen and (max-width: 767px) {
        font-size: 0.9rem;
      }
    }
    &__inline-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        flex-grow: 1;
        width: 33%;
        @media screen and (max-width: 767px) {
          width: 50%;
        }
      }
    }
  }
`

export const Home = () => {
  const { t } = useTranslation()
  const languages: Array<string> = t("curriculum.languagesList", {
    returnObjects: true,
  })
  const technicalSkills: Array<string> = t("curriculum.technicalSkills", {
    returnObjects: true,
  })
  const professionalExperiences: Array<ProfessionalExperience> = t(
    "curriculum.professionalExperiences",
    {
      returnObjects: true,
    }
  )
  const educations: Array<Educations> = t("curriculum.educations", {
    returnObjects: true,
  })
  const certificates: Array<Certificates> = t("curriculum.certificates", {
    returnObjects: true,
  })
  const awards: Array<Awards> = t("curriculum.awards", {
    returnObjects: true,
  })

  return (
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
          <Text>{t("curriculum.summaryText")}</Text>
        </Col>
      </Row>
      <Divider>{t("curriculum.technicalSkill")}</Divider>
      <Row>
        <Col span={24}>
          <ul className="curriculum__inline-list">
            {technicalSkills.map((skill: string, index) => (
              <li key={`skill-${index}`}>{skill}</li>
            ))}
          </ul>
        </Col>
      </Row>
      <Divider>{t("curriculum.languages")}</Divider>
      <Row>
        <Col span={24}>
          <ul className="curriculum__list">
            {languages.map((language: string, index) => (
              <li key={`lang-${index}`}>{language}</li>
            ))}
          </ul>
        </Col>
      </Row>
      <Divider>{t("curriculum.professionalExperience")}</Divider>
      {professionalExperiences.map((professionalExperience, index) => {
        const { job, company, date, description } = professionalExperience
        return (
          <Row key={`professional-${index}`} className="curriculum__section">
            <Col className="curriculum__header-block" span={12}>
              <Text className="curriculum__header">{job}</Text>
              <Text className="curriculum__subheader">{company}</Text>
            </Col>
            <Col span={12}>
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
        )
      })}
      <Divider>{t("curriculum.education")}</Divider>
      {educations.map((education, index) => {
        const { course, date, school } = education
        return (
          <Row key={`education-${index}`} className="curriculum__section">
            <Col className="curriculum__header-block" span={12}>
              <Text className="curriculum__header">{course}</Text>
              <Text className="curriculum__subheader">{school}</Text>
            </Col>
            <Col span={12}>
              <Text
                className="curriculum__date"
                style={{ textAlign: "end", display: "block" }}
              >
                {date}
              </Text>
            </Col>
          </Row>
        )
      })}
      <Divider>{t("curriculum.certificate")}</Divider>
      {certificates.map((certificate, index) => {
        const { course, date, description } = certificate
        return (
          <Row key={`certificate-${index}`} className="curriculum__section">
            <Col className="curriculum__header-block" span={12}>
              <Text className="curriculum__header">{course}</Text>
              <Text className="curriculum__subheader">{description}</Text>
            </Col>
            <Col span={12}>
              <Text
                className="curriculum__date"
                style={{ textAlign: "end", display: "block" }}
              >
                {date}
              </Text>
            </Col>
          </Row>
        )
      })}
      <Divider>{t("curriculum.award")}</Divider>
      {awards.map((aw, index) => {
        const { award, date, description } = aw
        return (
          <Row key={`aw-${index}`} className="curriculum__section">
            <Col className="curriculum__header-block" span={12}>
              <Text className="curriculum__header">{award}</Text>
              <Text className="curriculum__subheader">{description}</Text>
            </Col>
            <Col span={12}>
              <Text
                className="curriculum__date"
                style={{ textAlign: "end", display: "block" }}
              >
                {date}
              </Text>
            </Col>
          </Row>
        )
      })}
    </CurriculumContainer>
  )
}
