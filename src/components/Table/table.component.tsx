import React from "react";
import { StyledTable } from "./table.styled";
import { TableProps } from "antd/lib/table";

export const Table: React.FC<TableProps<any>> = (props: TableProps<any>) => {
  return <StyledTable {...props} pagination={{ defaultPageSize: 50 }} />;
};
