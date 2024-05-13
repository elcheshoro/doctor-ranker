import EpisodeData from "../../types/EpisodeData";
import getBrowser from "./getBrowser";
import getCastForSeason from "./getDoctorForSeason";
import getEpisodesForSeason from "./getEpisodesForSeason";
import getFileData from "./getFileData";
import writeFileData from "./writeFileData";

const getData = async () => {
    const fileData = await getFileData();

    if (fileData != null) return fileData;

    let findingResults = true;
    let season = 1;
    const browserInstance = await getBrowser();

    let page = await browserInstance.newPage();

    let episodes: EpisodeData[] = [];

    while (findingResults && season === 1) {
        const { doctor, assistant } = await getCastForSeason(page, season)

        const seasonEpisodes = await getEpisodesForSeason(page, season, doctor, assistant);
    
        // If no elements return 
        if (seasonEpisodes.length === 0) {
            findingResults = false;
        } else {
            episodes = episodes.concat(...seasonEpisodes)
            season = season + 1;
        }
    }

    await browserInstance.close();

    await writeFileData(episodes);

    return episodes;
}

export default getData;
