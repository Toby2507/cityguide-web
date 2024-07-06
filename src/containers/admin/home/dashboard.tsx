import { DashboardChart, EngagementCard, MetricCard } from '@/components';
import { engagements, metrics } from '@/data';

const AdminDashboard = () => {
  const tMetrics = metrics.map((metric) => {
    switch (metric.id) {
      case 'properties':
        return { ...metric, value: 40 };
      default:
        return metric;
    }
  });
  return (
    <section className="flex flex-col gap-4" id="dashboard">
      {/* <!-- Metrics --> */}
      <div className="flex items-center gap-4">
        {tMetrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>
      <div className="flex gap-4">
        <article className="flex flex-col h-full shadow-xl rounded-t-2xl border border-accentGray/20">
          <div className="flex flex-col gap-6 px-6 py-4">
            <p className="text-sm text-accentGray font-semibold">Recent Engagements</p>
            <div className="grid grid-cols-2 gap-4">
              {engagements.map((eng) => (
                <EngagementCard key={eng.id} {...eng} />
              ))}
            </div>
          </div>
          <div className="flex flex-col -mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#AED4FF"
                fill-opacity="1"
                d="M0,192L120,170.7C240,149,480,107,720,106.7C960,107,1200,149,1320,170.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
              ></path>
            </svg>
            <button className="text-white text-sm tracking-wide bg-accentLightBlue -mt-10 rounded-t-2xl pb-2">
              View Details
            </button>
          </div>
        </article>
        <figure className="flex-1 flex flex-col gap-4 h-full shadow-xl rounded-t-2xl px-6 py-4 border border-accentGray/20">
          <p className="text-sm text-accentGray font-semibold">Reservations</p>
          <DashboardChart />
        </figure>
      </div>
    </section>
  );
};

export default AdminDashboard;
