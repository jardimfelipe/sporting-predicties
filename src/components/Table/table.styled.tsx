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
    }
    td {
      border: none;
      &.vertical-border {
        border-right: 2px solid #000000;
      }
      span {
        .image-col {
          display: flex;
          align-items: center;
        }
        img {
          margin-right: 15px;
        }
        &.rating {
          border-radius: 50%;
          padding: 6px 5px;
          border: 1px solid #ccc;
        }
      }
    }
  }
`;
