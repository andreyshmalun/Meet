import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const colors = ['#513252', '#7A4069', '#CA4E79', '#829460;', '#50577A']
const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const data = genres.map((genre) => {
            const value = events.filter((event) =>
                event.summary.split(/[-!.,\s]/).includes(genre)
            ).length;
            return { name: genre, value };
        }).filter(entry => entry.value > 0);
        setData(data);
    }, [events]);

    return (
        <ResponsiveContainer height={350}>
            <PieChart width={100} height={350}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={70}
                    fill="#c19191"
                    dataKey="value"
                    label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenre;