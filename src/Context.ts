import { createContext, useContext } from "react";

export interface League {
  [key: string]: Standing[];
}

export interface LastUpdateState {
  en?: string;
  pt?: string;
}

export interface Ranking {
  ranking: number;
  positionChange: number;
  teamName: string;
  image: string;
  teamCountry?: string;
  attackParameter: number;
  defenseParameter: number;
}

export interface Standing {
  champion: number;
  image: string;
  mainPositions: number;
  minorPositions: number;
  points: number;
  predictedGoalsAgainst: number;
  predictedGoalsDifference: number;
  predictedGoalsFor: number;
  predictedPoints: number;
  relegatePositions: number;
  team: string;
}

export interface RankingState {
  localRanking?: Ranking[];
  internationalRanking?: Ranking[];
}

export interface PredictionsState {
  standings?: League;
  matches?: any;
}

export interface AppContextType {
  ranking: RankingState;
  predictions: PredictionsState;
  lastUpdate: LastUpdateState;
  setRanking: (Ranking: RankingState) => void;
  setPredictions: (Predictions: PredictionsState) => void;
  setLastUpdate: (LastUpdate: LastUpdateState) => void;
}

export const AppContext = createContext<AppContextType>({
  ranking: {},
  predictions: {},
  lastUpdate: {},
  setRanking: (ranking) => ranking,
  setPredictions: (predictions) => predictions,
  setLastUpdate: (lastUpdate) => lastUpdate,
});
export const useAppContext = () => useContext(AppContext);
