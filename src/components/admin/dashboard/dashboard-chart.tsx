'use client';

import { chartData } from '@/data';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DashboardChart = () => {
  return (
    <ResponsiveContainer width="100%" minHeight={324} height="100%">
      <AreaChart width={730} height={250} data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e42424" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#e42424" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0075ff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0075ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend iconType="square" iconSize={10} />
        <Area
          type="monotone"
          dataKey="Reservations"
          stroke="#0075ff"
          strokeOpacity={0.15}
          fillOpacity={0.55}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey="Cancelled Reservations"
          stroke="#e42424"
          strokeOpacity={0.15}
          fillOpacity={0.55}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
