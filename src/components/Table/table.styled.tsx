import styled from "styled-components";
import { Table as AntdTable } from "antd";

export const Table = styled(AntdTable)`
  tr {
    th {
      background-color: #ffffff;
      font-weight: bold;
      border-bottom: 2px solid #000000;
      &.single-column {
        vertical-align: bottom;
      }
      &.header-cell {
        border-bottom: 1px solid #000000 !important;
      }
    }
    td {
      border: none;
      position: relative;
      &.vertical-border {
        border-right: 2px solid #000000;
      }
      span {
        &.image-col {
          display: flex;
          align-items: center;
        }
        &.position-change {
          width: 35px;
          padding: 5px 7px;
          margin-top: -1px;
          text-align: right;
          border-radius: 10px;
          line-height: 22px;
          &.gain {
            background-color: rgba(68, 171, 67, 0.5);
          }
          &.loss {
            background-color: rgba(255, 39, 0, 0.5);
          }
        }
        img {
          margin-right: 15px;
          width: 30px;
          height: auto;
        }
      }
      div {
        &.rating {
          text-align: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          line-height: 32px;
          top: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
          box-sizing: content-box;
          margin: 0 auto;
        }
      }
    }
  }
`;
