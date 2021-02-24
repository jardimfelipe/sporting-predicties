import { createContext, useContext } from "react";

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
  standings?: Standing[];
  matches?: any;
}

export interface AppContextType {
  ranking: RankingState;
  predictions: PredictionsState;
  setRanking: (Ranking: RankingState) => void;
  setPredictions: (Predictions: PredictionsState) => void;
}

export const AppContext = createContext<AppContextType>({
  ranking: {},
  predictions: {},
  setRanking: (ranking) => ranking,
  setPredictions: (predictions) => predictions,
});
export const useAppContext = () => useContext(AppContext);
