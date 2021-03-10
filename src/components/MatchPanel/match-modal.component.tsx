import React, { useState, useEffect } from "react";
import { Match } from "Context";
// import { useTranslation } from "react-i18next";

import { Image, Modal, Typography } from "antd";

import { useWindowSize } from "@hooks";
import { Box } from "@components/Box/box.styled";
import styled from "styled-components";

const { Title } = Typography;

type MatchModalType = {
  match: Match;
  isVisible: boolean;
  onCancel: () => void;
};

export const MatchModal: React.FC<MatchModalType> = ({
  match,
  isVisible,
  onCancel,
}) => {
  const [modalSize, setModalSize] = useState(0);
  const { width } = useWindowSize();
  // const { t } = useTranslation();

  useEffect(() => {
    if (!width) return;
    if (width <= 767) setModalSize(() => 540);
    if (width <= 991) setModalSize(() => 720);
    if (width <= 1199) setModalSize(() => 960);
    if (width >= 1200) setModalSize(() => 1140);
  }, [width]);

  return (
    <Modal
      destroyOnClose
      footer={null}
      visible={isVisible}
      onCancel={onCancel}
      width={modalSize}
    >
      <Box params={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Box params={{ display: "flex", justifyContent: "space-around" }}>
          <Image src={match.homeImage} />
          <Image src={match.awayImage} />
        </Box>
        <Box params={{ display: "flex", justifyContent: "space-around" }}>
          <Score>{match.homeGoals}</Score>
          <Score>{match.awayGoals}</Score>
        </Box>
        <Box params={{ textAlign: "center" }}>
          <Title style={{ color: "#1da57a" }}>Match Statistics</Title>
        </Box>
      </Box>
      <Box
        params={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
        }}
      ></Box>
    </Modal>
  );
};

const Score = styled.span`
  font-size: 5rem;
  font-weight: bold;
`;

// const Statistic = styled.div``;
