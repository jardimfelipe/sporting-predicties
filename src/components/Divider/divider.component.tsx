import React from "react";
import styled from "styled-components";
import { Divider as AntdDivider } from "antd";

export const Wrapper = styled.div`
  .ant-divider-horizontal.ant-divider-with-text {
    color: #1da57a;
    margin-top: 30px;
    span {
      padding-left: 0;
      font-size: 24px;
    }
    &::before {
      width: 0%;
    }
    &&::after {
      color: #1da57a;
      border: 1px solid #1da57a;
    }
  }
`;

interface DividerProps {
  children?: any;
}

export const Divider: React.FC<DividerProps> = (props) => (
  <Wrapper>
    <AntdDivider orientation="left"> {props.children} </AntdDivider>
  </Wrapper>
);
