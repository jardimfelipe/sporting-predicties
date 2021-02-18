import React, { useEffect, useState } from "react";

import { Typography, Row, Col, Table, Image } from "antd";
import { Container } from "@components";
import { ColumnsType } from "antd/lib/table";

import { useRanking, Ranking as IRanking } from "../../Context";
import api from "@config/api";

import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
type RankingTypes = "internationalRanking" | "localRanking";

export const Ranking = () => {
  const { ranking, setRanking } = useRanking();
  const [isLoading, setIsLoading] = useState(false);
  const [currentRanking, setCurrentRanking] = useState<RankingTypes>(
    "internationalRanking"
  );
  const { t } = useTranslation();
  const columns: ColumnsType<IRanking> = [
    {
      title: t("table.ranking"),
      dataIndex: "ranking",
      key: "ranking",
      align: "center",
      width: 30,
    },
    {
      title: t("table.positionChange"),
      dataIndex: "positionChange",
      key: "positionChange",
      align: "center",
      width: 30,
    },
    {
      title: t("table.teamName"),
      dataIndex: "teamName",
      key: "teamName",
      align: "center",
    },
    {
      title: t("table.image"),
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (value) => <Image src={value} />,
    },
    ...(currentRanking === "localRanking"
      ? [
          {
            title: t("table.teamCountry"),
            dataIndex: "teamCountry",
            key: "teamCountry",
          },
        ]
      : []),
    {
      title: t("table.teamRating"),
      children: [
        {
          title: t("table.attackParameter"),
          dataIndex: "attackParameter",
          key: "attackParameter",
          align: "center",
          width: 30,
          render: (value) => value.toFixed(2),
        },
        {
          title: t("table.defenseParameter"),
          dataIndex: "defenseParameter",
          key: "defenseParameter",
          align: "center",
          width: 30,
          render: (value) => value.toFixed(2),
        },
      ],
    },
  ];

  const toCamel = (s: string) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
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
          <Text>{t("ranking.subTitle")}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={ranking[currentRanking] || []}
          />
        </Col>
      </Row>
    </Container>
  );
};
