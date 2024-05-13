import { DateTime } from "luxon";

const parseEpisodeText = (text: string) => {
    const rows = text.split(/\n/).map(entry => entry.trim());
    const [,,name,,rating,dateString] = rows;

    if (name == null || name === '' || rating == null || rating === '' || dateString == null || dateString === '') return null;

    const date = DateTime.fromFormat(dateString.replace('.', ''), 'd LLL yyyy');

    if (!date.isValid) return null;

    return {
        name,
        rating: Number(rating),
        date: date.toISO(),
    }
};

export default parseEpisodeText;
