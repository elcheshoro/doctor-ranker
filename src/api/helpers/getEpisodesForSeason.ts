import { Page } from "puppeteer";
import EpisodeData from "../../types/EpisodeData";
import arrayCompact from "./arrayCompact";
import { DateTime } from "luxon";

const getEpisodesForSeason = async (page: Page, season: number, doctor: string | null, assistant: string | null): Promise<EpisodeData[]> => {
    page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36');
    await page.goto(`https://m.imdb.com/title/tt0436992/episodes/?season=${season}`);
    const episodeElements = await page.$$('.episode-item-wrapper');

    const seasonEpisodes: Array<EpisodeData | null> = arrayCompact(await Promise.all(episodeElements.map(async (episodeElement, index) => {
        const [titleElement] = await episodeElement.$$('[data-testid="slate-list-card-title"]');
        const titleText = await page.evaluate(el => el.textContent, titleElement);

        if (titleText == null) return null;
    
        const [ratingElement] = await episodeElement.$$('[data-testid="ratingGroup--imdb-rating"]');
        const ratingText = await page.evaluate(el => el.textContent, ratingElement);
        if (ratingText == null) return null;
    
        const [ratingString] = ratingText.split('/');

        const [dateElement] = await episodeElement.$$('[data-testid="slate-list-card-title"] + span');
        const dateText = await page.evaluate(el => el.textContent, dateElement);
    
        if (dateText == null) return null;
        const [,day, year] = dateText.split(',');
        
        const date = DateTime.fromFormat(`${day.trim()} ${year.trim()}`, 'MMM d yyyy');

        if (!date.isValid) {
            return null;
        }
    
        return {
            name: titleText || '',
            rating: Number(ratingString),
            date: date.toISODate() || '',
            number: index + 1,
            season: season,
            doctor,
            assistant,
        };
    })));


    let episodes: EpisodeData[] = [];

    for (const seasonEpisode of seasonEpisodes) {
        if (seasonEpisode != null) {
            episodes.push(seasonEpisode);
        }
    }

    return episodes;
}

export default getEpisodesForSeason;