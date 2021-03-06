import React, { useEffect, useState } from "react";
import { useAppContext, Matches } from "../../Context";

import { useTranslation } from "react-i18next";

import { MatchPanel, Box } from "@components";
import { Spin } from "antd";

import api from "@config/api";

import { PageProps, LeagueOption } from "./types";

import { toCamel, parseParam } from "@utils";

export const PredictionsMatches: React.FC<PageProps> = ({
  currentLeague,
  setLeagueOptions,
}) => {
  const { predictions, setPredictions } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
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

  useEffect(() => {
    if (!!predictions.matches) {
      const selectOptions: LeagueOption[] = Object.keys(
        predictions.matches
      ).map((key) => ({
        label: t(`input.${key}`),
        value: key,
      }));
      if (setLeagueOptions) setLeagueOptions(selectOptions);
    }
  }, [predictions.matches, t, setLeagueOptions]);
  return (
    <>
      {!isLoading ? (
        <MatchPanel
          matches={
            predictions.matches ? predictions.matches[currentLeague] : []
          }
        />
      ) : (
        <Box
          params={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </Box>
      )}
    </>
  );
};
