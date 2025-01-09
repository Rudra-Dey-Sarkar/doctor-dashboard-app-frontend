"use client"
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type AgeDistributionType = {
  [key: string]: number;
};

function AgeDistribution({ ageData }: { ageData: AgeDistributionType }) {
  if (!ageData || Object.keys(ageData).length === 0) {
    return <div>Loading...</div>; // Prevent rendering mismatched content
  }

  const chartData = Object.keys(ageData).map((key) => ({
    age: key,
    count: ageData[key],
  }));

  return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Bar dataKey="count" fill="#8884d8" isAnimationActive={false} barSize={100} />
        </BarChart>
      </ResponsiveContainer>
  );
}


export default AgeDistribution