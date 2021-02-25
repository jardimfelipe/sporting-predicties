import React, { useState, useEffect } from "react";

import { useAppContext, Standing, League } from "../../Context";
import api from "@config/api";

import {
  Row,
  Col,
  Typography,
  Image,
  Select,
  Radio,
  RadioChangeEvent,
} from "antd";
import { Table } from "@components";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const getColor = (value: number) => {
  return `rgba(255, 133, 46, ${value})`;
};

type LeagueOption = {
  label: string;
  value: any;
};

type OnChangeEvent = {
  value: string | RadioChangeEvent;
  name: string;
};

type DetaskColumnType = {
  value: number;
};

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

const DestakColumn = styled.div<DetaskColumnType>`
  line-height: 0;
  ${({ value }: DetaskColumnType) => {
    return value * 100 < 0.1 && value * 100 > 0
      ? `
      color: #cccccc;
    `
      : `
      box-shadow: 0 0 0 50px ${getColor(value)};
      background-color: ${getColor(value)};
      `;
  }};
`;

export const Predictions = () => {
  const { predictions, setPredictions } = useAppContext();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [leagueOptions, setLeagueOptions] = useState<any[]>([]);
  const [sectionParams, setSectionParams] = useState({
    league: "brazilSerieA",
    pageMode: "table",
  });

  const renderPorcentageValue = (value: number) => {
    if (value > 0 && value < 0.1) return "< 0.1%";
    if (value > 99 && value < 100) return "> 99%";
    if (value === 0) return "-";
    if (value === 100) return <FaCheck />;
    return `${value.toFixed(1)}%`;
  };

  const columns: ColumnsType<Standing> = [
    {
      title: t("table.teamName"),
      dataIndex: "team",
      key: "team",
      className: "single-column vertical-border",
      render: (value, record) => (
        <>
          <span className="image-col">
            <Image preview={false} src={record.image} />
            {value}
            <Text type="secondary">
              {" "}
              <small>{record.points}pts</small>
            </Text>
          </span>
        </>
      ),
    },
    {
      title: t("table.predictedValues"),
      className: "header-cell",
      children: [
        {
          title: t("table.predictedGoalsDifference"),
          dataIndex: "predictedGoalsDifference",
          key: "predictedGoalsDifference",
          width: 100,
          align: "center",
          render: (value) => value.toFixed(0),
        },
        {
          title: t("table.predictedPoints"),
          dataIndex: "predictedPoints",
          key: "predictedPoints",
          width: 100,
          align: "center",
          render: (value) => value.toFixed(0),
        },
        {
          title: t("table.mainPositions"),
          dataIndex: "mainPositions",
          key: "mainPositions",
          align: "center",
          width: 100,
          render: (value) => renderPorcentageValue(value * 100),
        },
        {
          title: t("table.minorPositions"),
          dataIndex: "minorPositions",
          key: "minorPositions",
          width: 100,
          align: "center",
          render: (value) => renderPorcentageValue(value * 100),
        },
        {
          title: t("table.relegatePositions"),
          dataIndex: "relegatePositions",
          key: "relegatePositions",
          width: 100,
          align: "center",
          render: (value) => (
            <DestakColumn value={value}>
              {renderPorcentageValue(value * 100)}
            </DestakColumn>
          ),
        },
        {
          title: t("table.champion"),
          dataIndex: "champion",
          key: "champion",
          align: "center",
          width: 100,

          render: (value) => (
            <DestakColumn value={value}>
              {renderPorcentageValue(value * 100)}
            </DestakColumn>
          ),
        },
      ],
    },
  ];

  const handleChange = ({ name, value }: OnChangeEvent) => {
    setSectionParams({
      ...sectionParams,
      [name]: value,
    });
  };

  useEffect(() => {
    (async () => {
      if (predictions.standings) return;
      setIsLoading(true);
      const {
        data: { standings: dataStandings },
      } = await api.get("/standings");
      const keys = Object.keys(dataStandings);
      const standings: League = keys.reduce(
        (predictsObj: any, curr: string) => {
          const a = curr.split("/").pop() || "";
          predictsObj[toCamel(a)] = Object.keys(
            dataStandings[curr].team
          ).reduce(
            (standingArr: Array<object>, standingKeys: string, index) => {
              const team = Object.keys(dataStandings[curr]).reduce(
                (teamObj: any, keys) => {
                  teamObj = {
                    ...teamObj,
                    ...{
                      [toCamel(keys)]: dataStandings[curr][keys][index],
                    },
                  };
                  return teamObj;
                },
                {}
              );
              standingArr = [...standingArr, team];
              return standingArr;
            },
            []
          );
          return predictsObj;
        },
        {}
      );
      setPredictions({ standings });
      setIsLoading(false);
    })();
  }, [setPredictions, predictions.standings]);

  useEffect(() => {
    if (predictions.standings) {
      const selectOptions: LeagueOption[] = Object.keys(
        predictions.standings
      ).map((key) => ({
        label: t(`input.${key}`),
        value: key,
      }));
      setLeagueOptions((leagueOptions) => (leagueOptions = [...selectOptions]));
    }
  }, [predictions.standings, t]);

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
                handleChange({ name: "isMathes", value: e.target.value })
              }
              defaultValue={"table"}
              size="large"
            >
              <Radio.Button value="table">{t("input.table")}</Radio.Button>
              <Radio.Button disabled={true} value="matches">
                {t("input.matches")}
              </Radio.Button>
            </Radio.Group>
          </SelectWrapper>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            rowKey={(row) => row.team}
            loading={isLoading}
            columns={columns}
            dataSource={
              predictions.standings
                ? predictions.standings[
                    sectionParams.league as keyof typeof predictions.standings
                  ]
                : []
            }
          />
        </Col>
      </Row>
    </>
  );
};
