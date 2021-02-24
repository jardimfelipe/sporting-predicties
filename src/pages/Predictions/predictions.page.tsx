import React, { useState, useEffect } from "react";

import { useAppContext, Standing } from "../../Context";
import api from "@config/api";

import { Row, Col, Typography /*Table*/ } from "antd";

import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

export const Predictions = () => {
  const { predictions, setPredictions } = useAppContext();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      //   if (ranking.internationalRanking) return;
      setIsLoading(true);
      const {
        data: { standings: dataStandings },
      } = await api.get("/standings");
      const keys = Object.keys(dataStandings);
      const standings: Standing[] = keys.reduce(
        (predictsObj: any, curr: string) => {
          const a = curr.split("/").pop() || "";
          predictsObj[toCamel(a)] = Object.keys(dataStandings[curr]).reduce(
            (standingArr: Array<object>, standingKeys: string) => {
              const team = Object.keys(dataStandings[curr]).reduce(
                (teamObj: any, keys) => {
                  const x = Object.keys(dataStandings[curr][keys]).reduce(
                    (obj: any, currency: string) => {
                      obj[toCamel(keys)] = dataStandings[curr][keys][currency];
                      return obj;
                    },
                    {}
                  );
                  teamObj = { ...teamObj, ...x };
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
    })();
  }, [setPredictions]);
  console.log(predictions);
  console.log(isLoading);
  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title style={{ margin: 0 }}>{t("predictions.title")}</Title>
          <Text type="secondary">{t("predictions.subTitle")}</Text>
        </Col>
      </Row>
      {/* <Row>
        <Col span={24}>
          <RadioWrapper>
            <Radio.Group onChange={handleChange} defaultValue="localRanking">
              <Radio.Button value="localRanking">
                {t("ranking.localRanking")}
              </Radio.Button>
              <Radio.Button value="internationalRanking">
                {t("ranking.internationalRanking")}
              </Radio.Button>
            </Radio.Group>
          </RadioWrapper>
        </Col>
      </Row> */}
      {/* <Row>
        <Col span={24}>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={predictions.matches || []}
            pagination={{ defaultPageSize: 50 }}
          />
        </Col>
      </Row> */}
    </>
  );
};
