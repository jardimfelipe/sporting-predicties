import React, { useMemo, useState } from "react";
import { useAppContext, Matches } from "../../Context";

import { MatchPanel } from "@components";

import api from "@config/api";

import { PageProps } from "./types";

import { toCamel, parseParam } from "@utils";

export const PredictionsMatches: React.FC<PageProps> = ({ currentLeague }) => {
  const { predictions, setPredictions } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    let unmounted = false;
    if (predictions.matches) return;
    if (unmounted) return;
    (async () => {
      setIsLoading(true);
      const {
        data: { matches: dataMatches },
      } = await api.get("/matches");
      const keys = Object.keys(dataMatches);
      const t: Matches = keys.reduce((predictsObj: any, curr: string) => {
        const a = parseParam(curr);
        predictsObj[toCamel(a)] = Object.keys(
          dataMatches[curr].away_team
        ).reduce((matchArr: Array<object>, matchKeys: string, index) => {
          const team = Object.keys(dataMatches[curr]).reduce(
            (teamObj: any, keys) => {
              teamObj = {
                ...teamObj,
                ...{
                  [toCamel(keys)]: dataMatches[curr][keys][index],
                },
              };
              return teamObj;
            },
            {}
          );
          matchArr = [...matchArr, team];
          return matchArr;
        }, []);
        return predictsObj;
      }, {});
      setPredictions({ ...predictions, matches: t });
      setIsLoading(false);
    })();
    return () => {
      unmounted = true;
    };
  }, [predictions, setPredictions]);
  return (
    <>
      {predictions.matches ? (
        <MatchPanel match={predictions.matches[currentLeague][0]} />
      ) : (
        <h1>pl</h1>
      )}
    </>
  );
};
