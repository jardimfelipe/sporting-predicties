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
  return (
    <PanelContainer>
      <div className="date">
        <Text type="secondary">{match.date}</Text>
      </div>
      <div className="teams-container">
        <div className="team">
          <span>
            <img alt={match.homeTeam} src={match.homeImage} />
            {match.homeTeam}
          </span>
        </div>
        <div className="team">
          <span>
            <img alt={match.awayTeam} src={match.awayImage} />
            {match.awayTeam}
          </span>
        </div>
      </div>
      <div>{match.probDraw}</div>
    </PanelContainer>
  );
};
