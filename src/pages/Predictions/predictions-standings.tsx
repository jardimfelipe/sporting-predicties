import React, { useState, useEffect } from "react"

import { useAppContext, Standing, League } from "../../Context"
import api from "@config/api"

import { Typography, Image } from "antd"
import { Table } from "@components"
import styled from "styled-components"
import { FaCheck } from "react-icons/fa"

import { useTranslation } from "react-i18next"
import { ColumnsType } from "antd/es/table"

import { toCamel, parseParam, getProbColor } from "@utils"
import { LeagueOption, DetaskColumnType, PageProps } from "./types"
import { useWindowSize } from "@hooks"

import { SortOrder } from "antd/lib/table/interface"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"

const { Text } = Typography

const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

// const secondDivisionLeagues = ["brazilSerieB"];
const europeanLeagues = [
  "englandPremierLeague",
  "franceLigue-1",
  "germanyBundesLiga",
  "italySerieA",
  "netherlandsEredivisie",
  "portugalPortugueseLiga",
  "spainPrimeraDivision",
]

const cups = [
  "europeEuropeanChampionships",
  "europeUefaChampionsLeague",
  "southAmericaCopaLibertadores",
  "worldWorldCup",
]

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
      `
  }};
`

export const PredictionsStandings: React.FC<PageProps> = ({
  currentLeague,
  setLeagueOptions,
}) => {
  const { predictions, setPredictions } = useAppContext()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const { width } = useWindowSize()

  const isEuropeanLeague = () => europeanLeagues.includes(currentLeague)
  const isCup = () => cups.includes(currentLeague)
  // const isSecondDivisionLeague = () => secondDivisionLeagues.includes(currentLeague);

  const renderPorcentageValue = (value: number) => {
    if (value > 0 && value < 0.1) return "< 0.1%"
    if (value > 99 && value < 100) return "> 99%"
    if (value === 0) return "-"
    if (value === 100) return <FaCheck />
    return `${value.toFixed(1)}%`
  }

  const isLargeWidth = () => width && width > breakpoints.lg

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
    ...(isCup()
      ? [
          {
            title: t("table.predictedValues"),
            className: "header-cell",
            responsive: ["sm"] as Breakpoint[],
            children: [
              ...(isLargeWidth()
                ? [
                    {
                      title: t("table.makeRoundOf_16"),
                      dataIndex: "makeRoundOf_16",
                      key: "makeRoundOf_16",
                      width: 130,
                      align: "center" as "center",
                      render: (value: number) => (
                        <DestakColumn value={value}>
                          {renderPorcentageValue(value * 100)}
                        </DestakColumn>
                      ),
                      sorter: (a: Standing, b: Standing) => {
                        if (!a.makeRoundOf_16 || !b.makeRoundOf_16) return 0
                        return a.makeRoundOf_16 - b.makeRoundOf_16
                      },
                      sortDirections: ["descend", "ascend"] as SortOrder[],
                    },
                    {
                      title: t("table.makeQuarters"),
                      dataIndex: "makeQuarters",
                      key: "makeQuarters",
                      width: 100,
                      align: "center" as "center",
                      render: (value: number) => (
                        <DestakColumn value={value}>
                          {renderPorcentageValue(value * 100)}
                        </DestakColumn>
                      ),
                      sorter: (a: Standing, b: Standing) => {
                        if (!a.makeQuarters || !b.makeQuarters) return 0
                        return a.makeQuarters - b.makeQuarters
                      },
                      sortDirections: ["descend", "ascend"] as SortOrder[],
                    },
                  ]
                : []),
              {
                title: t("table.makeSemis"),
                dataIndex: "makeSemis",
                key: "makeSemis",
                width: 100,
                align: "center" as "center",
                render: (value: number) => (
                  <DestakColumn value={value}>
                    {renderPorcentageValue(value * 100)}
                  </DestakColumn>
                ),
                sorter: (a: Standing, b: Standing) => {
                  if (!a.makeSemis || !b.makeSemis) return 0
                  return a.makeSemis - b.makeSemis
                },
                sortDirections: ["descend", "ascend"] as SortOrder[],
                responsive: ["lg"] as Breakpoint[],
              },
              {
                title: t("table.makeFinal"),
                dataIndex: "makeFinal",
                key: "makeFinal",
                width: 100,
                align: "center" as "center",
                render: (value: number) => (
                  <DestakColumn value={value}>
                    {renderPorcentageValue(value * 100)}
                  </DestakColumn>
                ),
                sorter: (a: Standing, b: Standing) => {
                  if (!a.makeFinal || !b.makeFinal) return 0
                  return a.makeFinal - b.makeFinal
                },
                sortDirections: ["descend", "ascend"] as SortOrder[],
                responsive: ["lg"] as Breakpoint[],
              },
              {
                title: t("table.winFinal"),
                dataIndex: "winFinal",
                key: "winFinal",
                width: 100,
                align: "center" as "center",
                render: (value: number) => (
                  <DestakColumn value={value}>
                    {renderPorcentageValue(value * 100)}
                  </DestakColumn>
                ),
                sorter: (a: Standing, b: Standing) => {
                  if (!a.winFinal || !b.winFinal) return 0
                  return a.winFinal - b.winFinal
                },
                sortDirections: ["descend", "ascend"] as SortOrder[],
                responsive: ["lg"] as Breakpoint[],
              },
            ],
          },
          {
            title: t("table.winFinal"),
            dataIndex: "winFinal",
            key: "winFinal",
            align: "center" as "center",
            width: 100,
            sorter: (a: Standing, b: Standing) => {
              if (!a.winFinal || !b.winFinal) return 0
              return a.winFinal - b.winFinal
            },
            sortDirections: ["descend", "ascend"] as SortOrder[],
            render: (value: number) => (
              <DestakColumn value={value}>
                {renderPorcentageValue(value * 100)}
              </DestakColumn>
            ),
            responsive: ["xs"] as Breakpoint[],
          },
        ]
      : [
          {
            title: t("table.predictedValues"),
            className: "header-cell",
            responsive: ["sm"] as Breakpoint[],
            children: [
              ...(isLargeWidth()
                ? [
                    {
                      title: t("table.predictedGoalsDifference"),
                      dataIndex: "predictedGoalsDifference",
                      key: "predictedGoalsDifference",
                      width: 100,
                      align: "center" as "center",
                      render: (value: number) => value.toFixed(0),
                      sorter: (a: Standing, b: Standing) => {
                        if (
                          !a.predictedGoalsDifference ||
                          !b.predictedGoalsDifference
                        )
                          return 0
                        return (
                          a.predictedGoalsDifference -
                          b.predictedGoalsDifference
                        )
                      },
                      sortDirections: ["descend", "ascend"] as SortOrder[],
                    },
                    {
                      title: t("table.predictedPoints"),
                      dataIndex: "predictedPoints",
                      key: "predictedPoints",
                      width: 100,
                      align: "center" as "center",
                      render: (value: number) => value.toFixed(0),
                      sorter: (a: Standing, b: Standing) => {
                        if (!a.predictedPoints || !b.predictedPoints) return 0
                        return a.predictedPoints - b.predictedPoints
                      },
                      sortDirections: ["descend", "ascend"] as SortOrder[],
                    },
                  ]
                : []),
              {
                title: t(
                  `table.${
                    isEuropeanLeague()
                      ? "mainPositionsEuropean"
                      : "mainPositions"
                  }`
                ),
                dataIndex: "mainPositions",
                key: "mainPositions",
                align: "center" as "center",
                width: 100,
                render: (value: number) => (
                  <DestakColumn value={value}>
                    {renderPorcentageValue(value * 100)}
                  </DestakColumn>
                ),
                sorter: (a: Standing, b: Standing) => {
                  if (!a.mainPositions || !b.mainPositions) return 0
                  return a.mainPositions - b.mainPositions
                },
                sortDirections: ["descend", "ascend"] as SortOrder[],
                responsive: ["lg"] as Breakpoint[],
              },
              {
                title: t(
                  `table.${
                    isEuropeanLeague()
                      ? "minorPositionsEuropean"
                      : "minorPositions"
                  }`
                ),
                dataIndex: "minorPositions",
                key: "minorPositions",
                width: 100,
                align: "center" as "center",
                render: (value: number) => (
                  <DestakColumn value={value}>
                    {renderPorcentageValue(value * 100)}
                  </DestakColumn>
                ),
                sorter: (a: Standing, b: Standing) => {
                  if (!a.minorPositions || !b.minorPositions) return 0
                  return a.minorPositions - b.minorPositions
                },
                sortDirections: ["descend", "ascend"] as SortOrder[],
              },
              {
                title: t("table.relegatePositions"),
                dataIndex: "relegatePositions",
                key: "relegatePositions",
                width: 100,
                align: "center" as "center",
                render: (value: number) => (
                  <DestakColumn value={value}>
                    {renderPorcentageValue(value * 100)}
                  </DestakColumn>
                ),
                sorter: (a: Standing, b: Standing) => {
                  if (!a.relegatePositions || !b.relegatePositions) return 0
                  return a.relegatePositions - b.relegatePositions
                },
                sortDirections: ["descend", "ascend"] as SortOrder[],
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
                align: "center" as "center",
                width: 100,
                sorter: (a: Standing, b: Standing) => {
                  if (!a.champion || !b.champion) return 0
                  return a.champion - b.champion
                },
                sortDirections: ["descend", "ascend"] as SortOrder[],
                render: (value: number) => (
                  <DestakColumn value={value}>
                    {renderPorcentageValue(value * 100)}
                  </DestakColumn>
                ),
              },
            ],
          },
          {
            title: t("table.champion"),
            dataIndex: "champion",
            key: "champion",
            align: "center" as "center",
            width: 100,
            sorter: (a: Standing, b: Standing) => {
              if (!a.champion || !b.champion) return 0
              return a.champion - b.champion
            },
            sortDirections: ["descend", "ascend"] as SortOrder[],
            render: (value: number) => (
              <DestakColumn value={value}>
                {renderPorcentageValue(value * 100)}
              </DestakColumn>
            ),
            responsive: ["xs"] as Breakpoint[],
          },
        ]),
  ]

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!!predictions.standings) return
      if (unmounted) return
      setIsLoading(true)
      const {
        data: { competitions: dataStandings },
      } = await api.get("/competitions")
      const keys = Object.keys(dataStandings)
      const standings: League = keys.reduce(
        (predictsObj: any, curr: string) => {
          const a = parseParam(curr)
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
                  }
                  return teamObj
                },
                {}
              )
              standingArr = [...standingArr, team]
              return standingArr
            },
            []
          )
          return predictsObj
        },
        {}
      )
      setPredictions({ ...predictions, standings })
      setIsLoading(false)
    })()
    return () => {
      unmounted = true
    }
  }, [setPredictions, predictions])

  useEffect(() => {
    if (!!predictions.standings) {
      const selectOptions: LeagueOption[] = Object.keys(
        predictions.standings
      ).map((key) => ({
        label: t(`input.${key}`),
        value: key,
      }))
      if (setLeagueOptions) setLeagueOptions(selectOptions)
    }
  }, [predictions.standings, t, setLeagueOptions])

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
  )
}
