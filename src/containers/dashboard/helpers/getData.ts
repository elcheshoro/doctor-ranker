import axios from 'axios';
import episodeDataToEpisode from '../../../helpers/episodeDataToEpisode';
import EpisodeData from '../../../types/EpisodeData';

const getData = async () => axios.get<EpisodeData[]>('/api/episodes')
    .then((response) => {
        if (response.status !== 200) {
            throw new Error(typeof response.data || 'Request Failed');
        }

        return response.data.map(episodeData => episodeDataToEpisode(episodeData));
    });

export default getData;
