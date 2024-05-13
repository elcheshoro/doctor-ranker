import { DateTime } from "luxon";
import Episode from "../types/Episode";
import EpisodeData from "../types/EpisodeData";

const episodeDataToEpisode = (data: EpisodeData): Episode => ({
    ...data,
    date: DateTime.fromISO(data.date),
});

export default episodeDataToEpisode;
