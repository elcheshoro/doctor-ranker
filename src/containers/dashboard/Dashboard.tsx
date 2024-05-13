import React, { useEffect, useState } from 'react';
import EpisodeTimeSeries from '../../components/episodeTimeSeries/EpisodeTimeSeries';
import Episode from '../../types/Episode';
import getData from './helpers/getData';

const Dashboard = () => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    useEffect(() => {
        let shouldUpdate = true;
        getData()
            .then(result => {
                if (shouldUpdate) {
                    setEpisodes(result);
                }
            })
            .catch(() => {
                // TODO handle error
            });

        return () => {
            shouldUpdate = false;
        };
    }, []);

    return (
        <div>
            <div>Hello</div>
            <EpisodeTimeSeries episodes={episodes}/>
        </div>
    );
};

export default Dashboard;