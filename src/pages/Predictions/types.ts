import { RadioChangeEvent } from "antd";

export type OnChangeEvent = {
  value: string | RadioChangeEvent;
  name: string;
};

export type LeagueOption = {
  label: string;
  value: any;
};

export type DetaskColumnType = {
  value: number;
};

export interface PageProps {
  currentLeague: string;
  setLeagueOptions?: (options: LeagueOption[]) => void;
}
