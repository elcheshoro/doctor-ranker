import { Page } from "puppeteer";
import EpisodeData from "../../types/EpisodeData";
import arrayCompact from "./arrayCompact";
import parseEpisodeText from "./parseEpisodeText";

const getEpisodesForSeason = async (page: Page, season: number, doctor: string | null, assistant: string | null) => {
    await page.goto(`https://m.imdb.com/title/tt0436992/episodes/?season=${season}`);
    const episodeElements = await page.$$('#eplist a.btn-full');

    const seasonEpisodes: EpisodeData[] = arrayCompact(await Promise.all(episodeElements.map(async (episodeElement, index) => {
        const episodeText = await page.evaluate(el => el.textContent, episodeElement)
        if (episodeText == null) return null;
        const episodeData = parseEpisodeText(episodeText);
        if (episodeData == null) return null;
        return {
            name: episodeData.name,
            rating: episodeData.rating,
            date: episodeData.date,
            number: index + 1,
            season: season,
            doctor,
            assistant,
        };
    })));

    return seasonEpisodes;
}

export default getEpisodesForSeason;