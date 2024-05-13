import { DateTime } from "luxon"
import EpisodeData from "./EpisodeData"

type Episode = Omit<EpisodeData, 'date'> & {
    date: DateTime
};

export default Episode;