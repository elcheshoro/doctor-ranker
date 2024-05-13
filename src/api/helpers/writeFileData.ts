import fs from 'fs';
import path from 'path';

import { DateTime } from "luxon";
import EpisodeData from "../../types/EpisodeData";

const writeFileData = (episodes: EpisodeData[]) => {
    const fileData = JSON.stringify({
        time: DateTime.now().toISO(),
        episodes,
    });

    return new Promise<void>((resolve, reject) => {
        fs.writeFile('./data.json', fileData, (err) => {
            if (err == null) return resolve();
            console.log('ERROR', err);
            reject(new Error('Failed to write data to file'));
        });
    });
};


export default writeFileData;
