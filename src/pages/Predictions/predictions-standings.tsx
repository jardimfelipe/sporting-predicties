import React, { useState, useEffect } from "react";

import { useAppContext, Standing, League } from "../../Context";
import api from "@config/api";

import { Typography, Image } from "antd";
import { Table } from "@components";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";

import { toCamel, parseParam, getProbColor } from "@utils";
import { LeagueOption, DetaskColumnType, PageProps } from "./types";

const { Text } = Typography;

// const secondDivisionLeagues = ["brazilSerieB"];
const europeanLeagues = [
  "englandPremierLeague",
  "franceLigue-1",
  "germanyBundesLiga",
  "italySerieA",
  "netherlandsEredivisie",
  "portugalPortugueseLiga",
  "spainPrimeraDivision",
];
const DestakColumn = styled.div<DetaskColumnType>`
  line-height: 0;
  ${({ value }: DetaskColumnType) => {
    return value * 100 < 0.1 && value * 100 > 0
      ? `
      color: #cccccc;
    `
      : `
      box-shadow: 0 0 0 50px ${getProbColor(value)};
      background-color: ${getProbColor(value)};
      `;
  }};
`;

export const PredictionsStandings: React.FC<PageProps> = ({
  currentLeague,
  setLeagueOptions,
}) => {
  const { predictions, setPredictions } = useAppContext();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const isEuropeanLeague = () => europeanLeagues.includes(currentLeague);
  // const isSecondDivisionLeague = () => secondDivisionLeagues.includes(currentLeague);

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
          title: t(
            `table.${
              isEuropeanLeague() ? "mainPositionsEuropean" : "mainPositions"
            }`
          ),
          dataIndex: "mainPositions",
          key: "mainPositions",
          align: "center",
          width: 100,
          render: (value) => renderPorcentageValue(value * 100),
        },
        {
          title: t(
            `table.${
              isEuropeanLeague() ? "minorPositionsEuropean" : "minorPositions"
            }`
          ),
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
        // ...(isSecondDivisionLeague()
        //   ? [
        //       {
        //         title: t("table.promoted"),
        //         dataIndex: "teamCountry",
        //         key: "teamCountry",
        //         className: "single-column vertical-border",
        //         render: (value: string) => value.toUpperCase(),
        //       },
        //     ]
        //   : []),
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

  useEffect(() => {
    let unmounted = false;
    (async () => {
      if (!!predictions.standings) return;
      if (unmounted) return;
      setIsLoading(true);
      const {
        data: { standings: dataStandings },
      } = await api.get("/standings");
      const keys = Object.keys(dataStandings);
      const standings: League = keys.reduce(
        (predictsObj: any, curr: string) => {
          const a = parseParam(curr);
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
      setPredictions({ ...predictions, standings });
      setIsLoading(false);
    })();
    return () => {
      unmounted = true;
    };
  }, [setPredictions, predictions]);

  useEffect(() => {
    if (!!predictions.standings) {
      const selectOptions: LeagueOption[] = Object.keys(
        predictions.standings
      ).map((key) => ({
        label: t(`input.${key}`),
        value: key,
      }));
      if (setLeagueOptions) setLeagueOptions(selectOptions);
    }
  }, [predictions.standings, t, setLeagueOptions]);

  return (
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
  );
};
