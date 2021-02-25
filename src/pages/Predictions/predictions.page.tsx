import React, { useState, useEffect } from "react";

import { useAppContext, Standing, League } from "../../Context";
import api from "@config/api";

import { Row, Col, Typography, Image, Select } from "antd";
import { Table } from "@components";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

type LeagueTypes = "brazilSerieA";

type LeagueOption = {
  label: string;
  value: any;
};

const SelectWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  label {
    display: block;
  }
`;

export const Predictions = () => {
  const { predictions, setPredictions } = useAppContext();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [leagueOptions, setLeagueOptions] = useState<any[]>([]);
  const [currentLeague, setCurrentLeague] = useState<LeagueTypes>(
    "brazilSerieA"
  );

  const renderPorcentageValue = (value: number) => {
    if (value > 0 && value < 0.1) return "< 0.1%";
    if (value > 99 && value < 100) return "> 99%";
    if (value === 0) return "-";
    if (value === 100) return "v";
    return `${value.toFixed(1)}%`;
  };

  const columns: ColumnsType<Standing> = [
    {
      title: t("table.teamName"),
      dataIndex: "team",
      key: "team",
      className: "single-column",
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
    // {
    //   title: t("table.performance"),
    //   className: "header-cell",
    //   children: [
    //     {
    //       title: t("table.predictedGoalsAgainst"),
    //       dataIndex: "predictedGoalsAgainst",
    //       key: "predictedGoalsAgainst",
    //       render: (value) => value.toFixed(1),
    //     },
    //     {
    //       title: t("table.predictedGoalsFor"),
    //       dataIndex: "predictedGoalsFor",
    //       key: "predictedGoalsFor",
    //       render: (value) => value.toFixed(1),
    //     },
    //     {
    //       title: t("table.predictedGoalsDifference"),
    //       dataIndex: "predictedGoalsDifference",
    //       key: "predictedGoalsDifference",
    //       render: (value) => value.toFixed(1),
    //     },
    //   ],
    // },
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
          render: (value) => renderPorcentageValue(value * 100),
        },
        {
          title: t("table.champion"),
          dataIndex: "champion",
          key: "champion",
          align: "center",
          width: 100,
          render: (value) => renderPorcentageValue(value * 100),
        },
      ],
    },
  ];

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
                  // const x = Object.keys(dataStandings[curr][keys]).reduce(
                  //   (obj: any, currency: string) => {
                  //     obj[toCamel(keys)] =
                  //       dataStandings[curr][keys][parseInt(currency)];
                  //     return obj;
                  //   },
                  //   {}
                  // );
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
  }, [setPredictions]);

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
              placeholder={t("select.chooseLeague")}
              options={leagueOptions}
              defaultValue={"brazilSerieA"}
              size="large"
            />
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
                    currentLeague as keyof typeof predictions.standings
                  ]
                : []
            }
          />
        </Col>
      </Row>
    </>
  );
};
