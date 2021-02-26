import React, { useState, useCallback } from "react";

import { Row, Col, Typography, Select, Radio } from "antd";
import styled from "styled-components";

import { PredictionsStandings } from "./predictions-standings";

import { useTranslation } from "react-i18next";
import { PredictionsMatches } from "./predictions-matches";
import { OnChangeEvent } from "./types";

const { Title, Text } = Typography;

const SelectWrapper = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  .ant-select {
    flex: 0 0 250px;
  }
  .ant-radio-group {
    display: flex;
  }
  label {
    display: block;
  }
`;

export const Predictions = () => {
  const { t } = useTranslation();
  const [leagueOptions, setLeagueOptions] = useState<any[]>([]);
  const [sectionParams, setSectionParams] = useState({
    league: "brazilSerieA",
    pageMode: "matches",
  });

  const handleChange = ({ name, value }: OnChangeEvent) => {
    setSectionParams({
      ...sectionParams,
      [name]: value,
    });
  };

  const handleOptionsChange = useCallback((selectOptions) => {
    setLeagueOptions((leagueOptions) => (leagueOptions = [...selectOptions]));
  }, []);

  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title style={{ margin: 0 }}>{t("predictions.title")}</Title>
          <Text type="secondary">{t("predictions.subTitle")}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SelectWrapper>
            <Select
              onChange={(value) => handleChange({ name: "league", value })}
              placeholder={t("select.chooseLeague")}
              options={leagueOptions}
              defaultValue={"brazilSerieA"}
              size="large"
            />
            <Radio.Group
              onChange={(e) =>
                handleChange({ name: "pageMode", value: e.target.value })
              }
              defaultValue={"matches"}
              size="large"
            >
              <Radio.Button value="standings">{t("input.table")}</Radio.Button>
              <Radio.Button value="matches">{t("input.matches")}</Radio.Button>
            </Radio.Group>
          </SelectWrapper>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {sectionParams.pageMode === "standings" ? (
            <PredictionsStandings
              currentLeague={sectionParams.league}
              setLeagueOptions={handleOptionsChange}
            />
          ) : (
            <PredictionsMatches
              currentLeague={sectionParams.league}
              setLeagueOptions={handleOptionsChange}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
