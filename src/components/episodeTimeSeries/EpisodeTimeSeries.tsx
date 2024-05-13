import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

import Episode from '../../types/Episode';

import classes from './episodeTimeSeries.module.css';

interface Props {
    episodes: Episode[]
}

const EpisodeTimeSeries = ({ episodes }: Props) => {
    const ref = useRef();

    const sortedEpisodes = useMemo(() => episodes.sort((a, b) => a.date.toMillis() - b.date.toMillis() ), [episodes]);

    useEffect(() => {
        if (ref == null || sortedEpisodes.length === 0) return;

        const startDate = sortedEpisodes[0].date;
        const endDate = sortedEpisodes[sortedEpisodes.length - 1].date


        const dayDuration = endDate.diff(startDate, 'days');
        const monthDuration = endDate.diff(startDate, 'months');
        console.log('days', dayDuration.days)

        const margin = { top: 10, right: 30, bottom: 30, left: 60 };
        const chartWidth = (dayDuration.days * 2) - margin.left - margin.right;
        const chartHeight = 600 - margin.top - margin.bottom;

        d3.selectAll("#episode-time-series > *").remove();

        const svg = d3.select('#episode-time-series').append("svg")
                .attr("width", chartWidth + margin.left + margin.right)
                .attr("height", chartHeight + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleTime()
            .domain([startDate.minus({ weeks: 1 }).toJSDate(), endDate.plus({ weeks: 1 }).toJSDate()])
            .range([ 0, chartWidth ]);

        svg.append("g")
            .attr("class", classes.axis)
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(x).ticks(monthDuration.months));

        var y = d3.scaleLinear()
            .domain([0, 10])
            .range([ chartHeight, 0 ]);
        svg.append("g")
            .attr("class", classes.axis)
            .call(d3.axisLeft(y));

        svg.selectAll("mybar")
            .data(sortedEpisodes)
            .enter()
            .append("rect")
              .attr("x", (episode) => x(episode.date))
              .attr("y", (episode) => y(episode.rating))
              .attr("width", 1)
              .attr("height", (episode) => chartHeight - y(episode.rating))
              .attr("fill", "#69b3a2")

        console.log('rendered graph')
    }, [ref, sortedEpisodes]);

    return <div id="episode-time-series" />
};

export default EpisodeTimeSeries;
