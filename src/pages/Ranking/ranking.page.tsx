import React, { useEffect, useState } from "react";

import { Typography, Row, Col, Image, Select } from "antd";
import { Container, Table } from "@components";
import { ColumnsType } from "antd/lib/table";
import styled from "styled-components";

import { useRanking, Ranking as IRanking } from "../../Context";
import api from "@config/api";

import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
const { Option } = Select;
type RankingTypes = "internationalRanking" | "localRanking";

const SelectWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  label {
    display: block;
  }
`;

export const Ranking = () => {
  const { ranking, setRanking } = useRanking();
  const [isLoading, setIsLoading] = useState(false);
  const [currentRanking, setCurrentRanking] = useState<RankingTypes>(
    "localRanking"
  );
  const { t } = useTranslation();
  const columns: ColumnsType<any> = [
    {
      title: t("table.ranking"),
      dataIndex: "ranking",
      key: "ranking",
      align: "center",
      width: 30,
      className: "single-column",
    },
    {
      title: t("table.positionChange"),
      dataIndex: "positionChange",
      key: "positionChange",
      align: "center",
      width: 30,
      className: "single-column vertical-border",
      render: (value: number) => (
        <span
          className={`position-change ${
            value > 0 ? "gain" : value < 0 ? "loss" : ""
          }`}
        >
          {(value > 0 && `+ ${value}`) || (value < 0 && `- ${value}`) || ""}
        </span>
      ),
    },
    {
      title: t("table.teamName"),
      dataIndex: "teamName",
      key: "teamName",
      className: "single-column",
      render: (value, record) => (
        <span className="image-col">
          <Image src={record.image} />
          {value}
        </span>
      ),
    },
    ...(currentRanking === "localRanking"
      ? [
          {
            title: t("table.teamCountry"),
            dataIndex: "teamCountry",
            key: "teamCountry",
            className: "single-column vertical-border",
            render: (value: string) => value.toUpperCase(),
          },
        ]
      : []),
    {
      title: t("table.teamRating"),
      className: "header-cell",
      children: [
        {
          title: t("table.attackParameter"),
          dataIndex: "attackParameter",
          key: "attackParameter",
          align: "center",
          width: 30,
          render: (value) => (
            <div
              style={{ backgroundColor: getColor(value, "att") }}
              className={`rating att--drop-6`}
            >
              {value.toFixed(1)}
            </div>
          ),
        },
        {
          title: t("table.defenseParameter"),
          dataIndex: "defenseParameter",
          key: "defenseParameter",
          align: "center",
          width: 30,
          render: (value) => (
            <div
              style={{ backgroundColor: getColor(value, "deff") }}
              className={`rating def--drop-6`}
            >
              {value.toFixed(1)}
            </div>
          ),
        },
      ],
    },
  ];

  const handleChange = (value: RankingTypes) => {
    setCurrentRanking(value);
  };

  const toCamel = (s: string) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  };

  const getColor = (value: number, type: string) => {
    if (value <= 1) {
      return type === "att"
        ? `rgba(255,39,0,${1 - value})`
        : `rgba(68, 171, 67, ${value - 0.5})`;
    }
    if (value === 0) return "";
    return type === "att"
      ? `rgba(68, 171, 67, ${value - 1})`
      : `rgba(255,39,0,${value - 1})`;
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await api.get("/rankings");

      const localKeys = Object.keys(
        data.rankings["rankings/soccer_club_ranking"]
      );

      const internationalKeys = Object.keys(
        data.rankings["rankings/soccer_national_ranking"]
      );

      const localRanking: IRanking[] = Object.keys(
        data.rankings["rankings/soccer_club_ranking"].ranking
      ).reduce((rankingArr: any, curr) => {
        const team = localKeys.reduce((obj: any, keys) => {
          obj[toCamel(keys)] =
            data.rankings["rankings/soccer_club_ranking"][keys][curr];
          return obj;
        }, {});
        rankingArr = [...rankingArr, team];
        return rankingArr;
      }, []);

      const internationalRanking: IRanking[] = Object.keys(
        data.rankings["rankings/soccer_national_ranking"].ranking
      ).reduce((rankingArr: any, curr) => {
        const team = internationalKeys.reduce((obj: any, keys) => {
          obj[toCamel(keys)] =
            data.rankings["rankings/soccer_national_ranking"][keys][curr];
          return obj;
        }, {});
        rankingArr = [...rankingArr, team];
        return rankingArr;
      }, []);

      setRanking({ localRanking, internationalRanking });
      setIsLoading(false);
    })();
  }, [setRanking]);
  return (
    <Container>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title>{t("ranking.title")}</Title>
          <Text type="secondary">{t("ranking.subTitle")}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SelectWrapper>
            <label>Selectione o ranking:</label>
            <Select onChange={handleChange} defaultValue={currentRanking}>
              <Option value="localRanking">{t("ranking.localRanking")}</Option>
              <Option value="internationalRanking">
                {t("ranking.internationalRanking")}
              </Option>
            </Select>
          </SelectWrapper>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={ranking[currentRanking] || []}
            pagination={{ defaultPageSize: 50 }}
          />
        </Col>
      </Row>
    </Container>
  );
};
