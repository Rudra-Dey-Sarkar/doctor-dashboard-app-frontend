"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ProblemDistributionType = {
    [key: string]: number;
  };

function ProblemDistribution({ problemData }: { problemData:ProblemDistributionType }) {
    if (!problemData || Object.keys(problemData).length === 0) {
        return <div>Loading...</div>; // Prevent rendering mismatched content
    }

    const chartData = Object.keys(problemData).map((key) => ({
        age: key,
        count: problemData[key],
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={600}
                height={400}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" isAnimationActive={false} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ProblemDistribution