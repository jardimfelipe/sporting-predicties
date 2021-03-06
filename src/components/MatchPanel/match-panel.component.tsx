import { Match } from "Context";
import React, { useState } from "react";

import { Typography, Button } from "antd";
import { Box } from "@components";
import { PlusOutlined } from "@ant-design/icons";
import { MatchModal } from "./match-modal.component";

import { getProbColor } from "@utils";

import styled from "styled-components";

const { Text } = Typography;

type MatchInfo = {
  matches: Match[];
};

const PanelContainer: any = styled.div`
  display: flex;
  align-items: center;
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
`;

export const MatchPanel: React.FC<MatchInfo> = ({ matches }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | {}>({});

  const handleClick = (match: Match) => {
    setCurrentMatch((currentMatch) => (currentMatch = { ...match }));
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderValue = (value: number) => {
    const percent = value * 100;
    return `${percent.toFixed(1)}%`;
  };

  return (
    <Box
      params={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: "10px",
      }}
    >
      {matches.map((match: Match, index: number) => {
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
                    {renderValue(match.probHome)}
                  </span>
                </div>
              </div>
              <Button
                shape="circle"
                type="primary"
                size="small"
                className="match__button"
                icon={<PlusOutlined />}
                onClick={() => handleClick(match)}
              />
              <div className="match__team">
                <span className="match__team-name">
                  <img alt={match.awayTeam} src={match.awayImage} />
                  {match.awayTeam}
                </span>
                {/* <span className="match__team-goals">{match.awayGoals}</span> */}
                <div className="match__team-prob">
                  <span className="match__team-prob--away">
                    {renderValue(match.probAway)}
                  </span>
                </div>
              </div>
            </div>
            <div className="match__team-prob--draw">
              {renderValue(match.probDraw)}
            </div>
          </PanelContainer>
        );
      })}
      <MatchModal
        match={currentMatch}
        onCancel={handleCancel}
        isVisible={isModalVisible}
      />
    </Box>
  );
};
