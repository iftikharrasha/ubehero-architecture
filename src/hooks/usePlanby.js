import { useState, useEffect, useMemo, useCallback } from "react";
import { useEpg } from "planby";
import moment from "moment";
import axios from "axios";
import { theme } from "../lib/Helpers/theme";
// import useLandingApi from "./useLandingApi";

//THIS IS MOCK DATA WAY
import { fetchEpg, fetchChannels, fetchNowPlaying } from "../lib/Helpers";

export function usePlanby() {
  // const { fetchChannels } = useLandingApi();
  const [epg, setEpg] = useState([]);
  const [channels, setChannels] = useState([]);
  const [nowPlaying, setNowPlaying] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const channelsData = useMemo(() => channels, [channels]);
  const epgData = useMemo(() => epg, [epg]);

  const date = new Date();
  var today = moment(date).format('YYYY-MM-DD');

  const { getEpgProps, getLayoutProps } = useEpg({
    epg: epgData,
    channels: channelsData,
    dayWidth: 7200,
    sidebarWidth: 100,
    itemHeight: 80,
    isSidebar: true,
    isTimeline: true,
    isLine: true,
    isBaseTimeFormat: true,
    startDate: `${today}T00:00:00`,
    endDate: `${today}T24:00:00`,
    theme
  });


  //TODO: FETCH THIS WITH REDUX SYSTEM
  // const handleFetchResources = useCallback(async () => {
  //   setIsLoading(true);
  //   const data = await fetchChannels();
  //   setEpg(data.epg);
  //   setChannels(data.channels);
  //   setNowPlaying(data.nowPlaying[0]);
  //   setIsLoading(false);
  // }, []);

  //THIS IS MOCK DATA WAY
  const handleFetchResources = useCallback(async () => {
    setIsLoading(true);
    const epg = await fetchEpg();
    const channels = await fetchChannels();
    const nowPlaying = await fetchNowPlaying();
    setEpg(epg);
    setChannels(channels);
    setNowPlaying(nowPlaying);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return { getEpgProps, getLayoutProps, isLoading, nowPlaying, setNowPlaying };
}
