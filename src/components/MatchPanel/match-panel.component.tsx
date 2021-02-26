import { Match } from "Context";
import React from "react";

import { Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

type MatchInfo = {
  match: Match;
};

const PanelContainer = styled.div`
  display: flex;
  align-items: center;
  & div:not(.team) {
    border: 1px solid gray;
  }
  .date {
    background: #ccc;
  }
  .teams-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .team {
      background: #ccc;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      span {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          width: 30px;
          height: auto;
        }
      }
    }
  }
`;

export const MatchPanel: React.FC<MatchInfo> = ({ match }) => {
  const renderValue = (value: number) => {
    const percent = value * 100;
    return `${percent.toFixed(1)}%`;
  };
  return (
    <PanelContainer>
      <div className="date">
        <Text type="secondary">{match.date}</Text>
      </div>
      <div className="teams-container">
        <div className="team">
          <span className="team-name">
            <img alt={match.homeTeam} src={match.homeImage} />
            {match.homeTeam}
          </span>
          <span className="team-goals">{match.homeGoals}</span>
          <span className="team-prob">{renderValue(match.probHome)}</span>
        </div>
        <div className="team">
          <span className="team-name">
            <img alt={match.awayTeam} src={match.awayImage} />
            {match.awayTeam}
          </span>
          <span className="team-goals">{match.awayGoals}</span>
          <span className="team-prob">{renderValue(match.probAway)}</span>
        </div>
      </div>
      <div className="team-prob">{renderValue(match.probDraw)}</div>
    </PanelContainer>
  );
};
