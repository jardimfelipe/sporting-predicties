import React from "react";
import { Match } from "Context";

import { Modal } from "antd";

type MatchModalType = {
  match: Match | {};
  isVisible: boolean;
  onCancel: () => void;
};

export const MatchModal: React.FC<MatchModalType> = ({
  match,
  isVisible,
  onCancel,
}) => {
  return (
    <Modal
      destroyOnClose
      footer={null}
      visible={isVisible}
      onCancel={onCancel}
    ></Modal>
  );
};
