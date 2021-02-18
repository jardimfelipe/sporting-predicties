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

export interface RankingState {
  localRanking?: Ranking[];
  internationalRanking?: Ranking[];
}

export interface RankingContextType {
  ranking: RankingState;
  setRanking: (Ranking: RankingState) => void;
}

export const RankingContext = createContext<RankingContextType>({
  ranking: {},
  setRanking: (ranking) => ranking,
});
export const useRanking = () => useContext(RankingContext);
