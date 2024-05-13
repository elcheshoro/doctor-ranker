import fs from 'fs';

import { DateTime } from "luxon";
import EpisodeData from "../../types/EpisodeData";

const getFileData = () => {
    return new Promise<null | EpisodeData[]>((resolve, reject) => {
        fs.readFile('./data.json', (err, data) => {
            if (err != null) {
                if (err.code === 'ENOENT') return resolve(null);
                return reject(err.code);
            }

            const stringData = data.toString();

            const { time, episodes }: { time: string, episodes: EpisodeData[] } = JSON.parse(stringData);

            if (DateTime.fromISO(time).diff(DateTime.now().minus({ minutes: 30 })).milliseconds < 0) {
                return resolve(null);
            } else {
                return resolve(episodes)
            }
        });
    });
};


export default getFileData;