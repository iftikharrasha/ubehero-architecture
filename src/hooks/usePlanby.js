import { useState, useEffect, useMemo, useCallback } from "react";
import { useEpg } from "planby";
import moment from "moment";
import axios from "axios";
import { theme } from "../lib/Helpers/theme";
// import useLandingApi from "./useLandingApi";

//THIS IS MOCK DATA WAY
import { fetchEpg, fetchChannels } from "../lib/Helpers";

export function usePlanby() {
  const [channels, setChannels] = useState([]);
  const [epg, setEpg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const channelsData = useMemo(() => channels, [channels]);
  const epgData = useMemo(() => epg, [epg]);

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
    startDate: "2022-07-24T00:00:00",
    endDate: "2022-07-24T24:00:00",
    theme
  });

  const handleFetchResources = useCallback(async () => {
    setIsLoading(true);
    const epg = await fetchEpg();
    const channels = await fetchChannels();
    setEpg(epg);
    setChannels(channels);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return { getEpgProps, getLayoutProps, isLoading };
}
