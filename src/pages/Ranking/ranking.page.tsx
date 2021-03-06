import React, { useEffect, useState } from "react"

import { Typography, Row, Col, Image, Radio, RadioChangeEvent } from "antd"
import { Table, Box } from "@components"
import { ColumnsType } from "antd/es/table"
import styled from "styled-components"

import { useAppContext, Ranking as IRanking } from "../../Context"
import api from "@config/api"

import { useTranslation } from "react-i18next"
import { toCamel } from "@utils"
import { useWindowSize } from "@hooks"

import { SortOrder } from "antd/lib/table/interface"

const { Title, Text } = Typography
type RankingTypes = "internationalRanking" | "localRanking"

const RadioWrapper = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: flex-start;
`

const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

export const Ranking = () => {
  const { width } = useWindowSize()
  const { ranking, lastUpdate, setRanking } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [currentRanking, setCurrentRanking] = useState<RankingTypes>(
    "localRanking"
  )
  const { t, i18n } = useTranslation()

  const showTeamCountry = () => {
    if (!width) return currentRanking === "localRanking"
    return currentRanking === "localRanking" && width > breakpoints.lg
  }

  const columns: ColumnsType<IRanking> = [
    {
      title: t("table.ranking"),
      dataIndex: "ranking",
      key: "ranking",
      align: "center",
      width: 30,
      className: "single-column",
      sorter: (a: IRanking, b: IRanking) => a.ranking - b.ranking,
      sortDirections: ["descend", "ascend"] as SortOrder[],
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
      responsive: ["sm"],
    },
    {
      title: t("table.teamName"),
      dataIndex: "teamName",
      key: "teamName",
      className: "single-column",
      render: (value, record) => (
        <span className="image-col">
          <Image preview={false} src={record.image} />
          {value}
        </span>
      ),
    },
    ...(showTeamCountry()
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
      responsive: ["sm"],
      children: [
        {
          title: t("table.attackParameter"),
          dataIndex: "attackParameter",
          key: "attackParameter",
          align: "center",
          width: 30,
          sorter: (a: IRanking, b: IRanking) =>
            a.attackParameter - b.attackParameter,
          sortDirections: ["descend", "ascend"] as SortOrder[],
          render: (value) => (
            <div
              style={{ backgroundColor: getColor(value) }}
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
          sorter: (a: IRanking, b: IRanking) =>
            a.defenseParameter - b.defenseParameter,
          sortDirections: ["descend", "ascend"] as SortOrder[],
          render: (value) => (
            <div
              style={{ backgroundColor: getColor(value) }}
              className={`rating def--drop-6`}
            >
              {value.toFixed(1)}
            </div>
          ),
        },
      ],
    },
  ]

  const handleChange = (e: RadioChangeEvent) => {
    setCurrentRanking(e.target.value)
  }

  const getColor = (value: number) => {
    if (value <= 1) {
      return `rgba(255,39,0,${1 - value})`
    }
    if (value === 0) return ""
    return `rgba(68, 171, 67, ${value - 1})`
  }

  useEffect(() => {
    ;(async () => {
      if (ranking.internationalRanking) return
      setIsLoading(true)
      const { data } = await api.get("/rankings")

      const localKeys = Object.keys(
        data.rankings["rankings/soccer_club_ranking"]
      )

      const internationalKeys = Object.keys(
        data.rankings["rankings/soccer_national_ranking"]
      )

      const localRanking: IRanking[] = Object.keys(
        data.rankings["rankings/soccer_club_ranking"].ranking
      ).reduce((rankingArr: any, curr) => {
        const team = localKeys.reduce((obj: any, keys) => {
          obj[toCamel(keys)] =
            data.rankings["rankings/soccer_club_ranking"][keys][curr]
          return obj
        }, {})
        rankingArr = [...rankingArr, team]
        return rankingArr
      }, [])

      const internationalRanking: IRanking[] = Object.keys(
        data.rankings["rankings/soccer_national_ranking"].ranking
      ).reduce((rankingArr: any, curr) => {
        const team = internationalKeys.reduce((obj: any, keys) => {
          obj[toCamel(keys)] =
            data.rankings["rankings/soccer_national_ranking"][keys][curr]
          return obj
        }, {})
        rankingArr = [...rankingArr, team]
        return rankingArr
      }, [])

      setRanking({ localRanking, internationalRanking })
      setIsLoading(false)
    })()
  }, [setRanking, ranking.internationalRanking])
  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Box
            params={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Title style={{ margin: 0 }}>{t("ranking.title")}</Title>
            <Text type="secondary">{t("ranking.subTitle")}</Text>
            {lastUpdate[i18n.language as keyof typeof lastUpdate] && (
              <Text type="secondary">{`${t("lastUpdate")}: ${
                lastUpdate[i18n.language as keyof typeof lastUpdate]
              }`}</Text>
            )}
          </Box>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <RadioWrapper>
            <Radio.Group
              size="large"
              onChange={handleChange}
              defaultValue="localRanking"
            >
              <Radio.Button value="localRanking">
                {t("ranking.localRanking")}
              </Radio.Button>
              <Radio.Button value="internationalRanking">
                {t("ranking.internationalRanking")}
              </Radio.Button>
            </Radio.Group>
          </RadioWrapper>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            rowKey={(row: IRanking) => row.ranking}
            loading={isLoading}
            columns={columns}
            dataSource={ranking[currentRanking] || []}
            pagination={{ defaultPageSize: 50 }}
          />
        </Col>
      </Row>
    </>
  )
}
