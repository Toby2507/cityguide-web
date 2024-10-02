'use client';

import { DashboardChart, EngagementCard, MetricCard } from '@/components';
import { dateFilters, engagements, intervals } from '@/data';
import { getAdminAnalytics, getReservationAnalytics } from '@/server';
import { IReservationStats } from '@/types';
import {
  Button,
  DateValue,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  RangeCalendar,
  RangeValue,
  Selection,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import dayjs, { ManipulateType } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { BsListCheck } from 'react-icons/bs';
import { HiMiniSquare3Stack3D } from 'react-icons/hi2';
import { IoChevronDownOutline } from 'react-icons/io5';
import { MdFreeCancellation, MdPendingActions } from 'react-icons/md';
import { PiStackPlusFill } from 'react-icons/pi';

const AdminDashboard = () => {
  const { data } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: getAdminAnalytics,
  });
  const [interval, setInterval] = useState<Selection>(new Set(['daily']));
  const [dateFilter, setDateFilter] = useState<Selection>(new Set(['6 day']));
  const [customDate, setCustomDate] = useState<RangeValue<DateValue>>();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [chartData, setChartData] = useState<IReservationStats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const metrics = useMemo(
    () => [
      { id: 'properties', title: 'Total Properties', value: data?.totalProperties ?? 0, Icon: HiMiniSquare3Stack3D },
      { id: 'availableProp', title: 'Available Properties', value: data?.availableStays ?? 0, Icon: PiStackPlusFill },
      { id: 'totalRes', title: 'Total Reservations', value: data?.totalReservations ?? 0, Icon: BsListCheck },
      {
        id: 'pendingRes',
        title: 'Pending Reservations',
        value: data?.pendingReservations ?? 0,
        Icon: MdPendingActions,
      },
      {
        id: 'cancelledRes',
        title: 'Cancelled Reservations',
        value: data?.cancelledReservations ?? 0,
        Icon: MdFreeCancellation,
      },
    ],
    [data]
  );
  const formattedInput = useMemo(() => {
    let from = dayjs().subtract(6, 'd').format('YYYY-MM-DD'),
      to = dayjs().format('YYYY-MM-DD');
    if (Array.from(dateFilter).includes('custom')) {
      from = dayjs(customDate?.start?.toString()).format('YYYY-MM-DD');
      to = dayjs(customDate?.end?.toString()).format('YYYY-MM-DD');
    } else {
      const [value, unit] = String(Array.from(dateFilter)[0]).split(' ');
      from = dayjs()
        .subtract(Number(value), unit as ManipulateType)
        .format('YYYY-MM-DD');
      to = dayjs().format('YYYY-MM-DD');
    }
    const intervalString = Array.from(interval)[0].toString() as 'daily' | 'weekly' | 'monthly';
    return { from, to, interval: intervalString };
  }, [dateFilter, customDate, interval]);

  useEffect(() => {
    let inputData = formattedInput;
    (async () => {
      try {
        setIsLoading(true);
        const data = await getReservationAnalytics(inputData);
        setChartData(data);
        setIsLoading(false);
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, [formattedInput]);
  useEffect(() => {
    if (customDate) setShowCalendar(false);
  }, [customDate]);
  return (
    <section className="flex flex-col gap-4" id="dashboard">
      {/* <!-- Metrics --> */}
      <div className="flex items-center gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>
      <div className="flex gap-4">
        <article className="flex flex-col h-full shadow-2xl rounded-t-2xl border border-accentGray/20">
          <div className="flex flex-col gap-6 px-6 py-4">
            <p className="text-sm text-accentGray font-semibold">Recent Engagements</p>
            <div className="grid grid-cols-2 gap-4">
              {data?.engagements?.length
                ? data.engagements.map((eng) => <EngagementCard key={eng._id} {...eng} />)
                : null}
            </div>
          </div>
          <div className="flex flex-col -mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#0075FF"
                fillOpacity="1"
                d="M0,192L120,170.7C240,149,480,107,720,106.7C960,107,1200,149,1320,170.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
              ></path>
            </svg>
          </div>
        </article>
        <article className="flex-1 flex flex-col gap-2 h-full shadow-xl rounded-t-2xl px-4 pb-4 pt-3 border border-accentGray/20">
          <div className="relative flex items-center justify-between gap-10">
            <p className="text-sm text-accentGray font-semibold">Reservations</p>
            <div className="flex items-end gap-4">
              {showCalendar ? (
                <RangeCalendar
                  className="absolute top-[115%] right-0 z-10"
                  value={customDate}
                  onChange={setCustomDate}
                />
              ) : null}
              <Dropdown>
                <DropdownTrigger className="hidden w-full sm:flex">
                  <Button
                    className="w-full text-zinc-600 border"
                    size="sm"
                    endContent={<IoChevronDownOutline className="text-small" />}
                    variant="bordered"
                  >
                    {dateFilters.find((d) => d.key === Array.from(dateFilter)[0])?.label}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  selectedKeys={dateFilter}
                  selectionMode="single"
                  onSelectionChange={(key) => {
                    setDateFilter(key);
                    setShowCalendar(Array.from(key).includes('custom'));
                  }}
                >
                  {dateFilters.map(({ key, label }) => (
                    <DropdownItem key={key} className="capitalize" onSelect={() => setShowCalendar(key === 'custom')}>
                      {label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden w-full sm:flex">
                  <Button
                    className="w-full text-zinc-600 border capitalize"
                    size="sm"
                    endContent={<IoChevronDownOutline className="text-small" />}
                    variant="bordered"
                  >
                    {Array.from(interval)[0]}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  selectedKeys={interval}
                  selectionMode="single"
                  onSelectionChange={setInterval}
                >
                  {intervals.map((key) => (
                    <DropdownItem key={key} className="capitalize">
                      {key}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <DashboardChart isLoading={isLoading} data={chartData} />
        </article>
      </div>
    </section>
  );
};

export default AdminDashboard;
