import { channels } from "../Data/channels";
import { epg } from "../Data/egg";

export const fetchChannels = async () =>
  new Promise((res) => setTimeout(() => res(channels), 400));

export const fetchEpg = async () =>
  new Promise((res) => setTimeout(() => res(epg), 500));
