import { Match } from "Context"
import React, { useState, useEffect } from "react"

import { Typography, Button, Tooltip } from "antd"
import { Box } from "@components"
import { InfoOutlined, CloseOutlined } from "@ant-design/icons"
// import { MatchModal } from "./match-modal.component"

import { getProbColor, toPercentage } from "@utils"

import styled from "styled-components"

const { Text } = Typography

type MatchInfo = {
  matches: Match[]
}

const PanelContainer: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 345px;
  position: relative;
  .match {
    &__button {
      position: absolute;
      top: 50%;
      right: 7rem;
      transform: translateY(-50%);
      z-index: 2;
    }
    &__date {
      background: #f0f0f0;
      padding: 10px;
      font-size: 0.785rem;
      border: 1px solid #cccccc;
      border-right: none;
    }
    &__teams-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 58%;
    }
    &__team {
      background: #f0f0f0;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #cccccc;
      position: relative;
    }
    &__team-name {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.875rem;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100px;
      }
      img {
        width: 30px;
        height: auto;
      }
    }
    &__team-prob {
      font-size: 0.785rem;
      position: absolute;
      right: 0;
      height: 100%;
      span {
        height: 100%;
        padding: 0 5px;
        display: flex;
        align-items: center;
      }
      ${({ probAway, probHome, probDraw }: any) => `
        &--home {
          background-color: ${getProbColor(probHome)};
        }
        &--away {
          background-color: ${getProbColor(probAway)};
        }
        &--draw {
          background-color: ${getProbColor(probDraw)};
          padding: 5px;
          font-size: 0.785rem;
          border: 1px solid #cccccc;
          border-left: none;
        }
      `}
    }
  }
`

const TooltipContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 32px;
      height: auto;
    }
    span {
      font-size: 1.5em;
      font-weight: bold;
    }
  }
`

export const MatchPanel: React.FC<MatchInfo> = ({ matches = [] }) => {
  const MAX_PER_PAGE = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [pageMatches, setPageMatches] = useState<Match[]>([])

  useEffect(() => {
    const maxMatches = MAX_PER_PAGE * currentPage
    setPageMatches(() => matches.filter((_, index) => index < maxMatches))
  }, [matches, currentPage])

  // const [isModalVisible, setIsModalVisible] = useState(false)
  // const [currentMatch setCurrentMatch] = useState<Match>(matches[0])

  // const handleClick = (match: Match) => {
  //   setCurrentMatch((currentMatch) => (currentMatch = { ...match }))
  //   setIsModalVisible(true)
  // }

  // const handleCancel = () => {
  //   setIsModalVisible(false)
  // }

  return (
    <>
      <Box
        params={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {pageMatches.map((match: Match, index: number) => {
          return (
            <PanelContainer
              probHome={match.probHome}
              probAway={match.probAway}
              probDraw={match.probDraw}
              key={`match-${index}`}
              className="match"
            >
              <div className="match__date">
                <Text type="secondary">{match.date}</Text>
              </div>
              <div className="match__teams-container">
                <div className="match__team">
                  <div className="match__team-name">
                    <img alt={match.homeTeam} src={match.homeImage} />
                    <span>{match.homeTeam}</span>
                  </div>
                  {/* <span className="team-goals">{match.homeGoals}</span> */}
                  <div className="match__team-prob">
                    <span className="match__team-prob--home">
                      {toPercentage(match.probHome)}
                    </span>
                  </div>
                </div>
                <Tooltip
                  title={
                    <TooltipContainer>
                      <div className="match__tooltip-team">
                        <img
                          className="match__tooltip-img"
                          alt={match.homeTeam}
                          src={match.homeImage}
                        />
                        <span className="match__tooltip-score">
                          {match.homeGoals}
                        </span>
                      </div>
                      <CloseOutlined />
                      <div className="match__tooltip-team">
                        <span className="match__tooltip-score">
                          {match.awayGoals}
                        </span>
                        <img
                          className="match__tooltip-img"
                          alt={match.awayTeam}
                          src={match.awayImage}
                        />
                      </div>
                    </TooltipContainer>
                  }
                  color="primary"
                >
                  <Button
                    shape="circle"
                    type="primary"
                    size="small"
                    className="match__button"
                    icon={<InfoOutlined />}
                  />
                </Tooltip>
                <div className="match__team">
                  <div className="match__team-name">
                    <img alt={match.awayTeam} src={match.awayImage} />
                    <span>{match.awayTeam}</span>
                  </div>
                  {/* <span className="match__team-goals">{match.awayGoals}</span> */}
                  <div className="match__team-prob">
                    <span className="match__team-prob--away">
                      {toPercentage(match.probAway)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="match__team-prob--draw">
                {toPercentage(match.probDraw)}
              </div>
            </PanelContainer>
          )
        })}
        {/* {currentMatch && (
        <MatchModal
          match={currentMatch}
          onCancel={handleCancel}
          isVisible={isModalVisible}
        />
      )} */}
      </Box>
      <Box
        params={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        {matches.length > pageMatches.length && (
          <Button
            onClick={() => setCurrentPage((currentPage) => (currentPage += 1))}
          >
            Carregar Mais
          </Button>
        )}
      </Box>
    </>
  )
}
