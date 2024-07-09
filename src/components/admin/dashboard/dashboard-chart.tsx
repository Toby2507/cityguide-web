'use client';

import { IReservationStats } from '@/types';
import { ImSpinner2 } from 'react-icons/im';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface IDashboardChart {
  isLoading: boolean;
  data: IReservationStats[];
}

const DashboardChart = ({ data, isLoading }: IDashboardChart) => {
  return (
    <ResponsiveContainer width="100%" minHeight={324} height="100%">
      {isLoading ? (
        <div className="grid place-items-center w-full h-72">
          <ImSpinner2 className="text-6xl text-accentGray animate-spin" />
        </div>
      ) : (
        <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="cancelledReservations" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e42424" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#e42424" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="reservation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0075ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0075ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} />
          <YAxis tickLine={false} />
          <CartesianGrid stroke="#F2F2F299" />
          <Tooltip />
          <Legend iconType="square" iconSize={10} wrapperStyle={{ gap: 20 }} />
          <Area
            type="monotone"
            dataKey="Reservations"
            stroke="#0075ff"
            strokeOpacity={0.15}
            fillOpacity={0.55}
            fill="url(#reservation)"
          />
          <Area
            type="monotone"
            dataKey="Cancelled Reservations"
            stroke="#e42424"
            strokeOpacity={0.15}
            fillOpacity={0.55}
            fill="url(#cancelledReservations)"
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export default DashboardChart;
