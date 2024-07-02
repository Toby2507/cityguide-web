import { MetricCard } from '@/components';
import { metrics } from '@/data';

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
    <section id="dashboard">
      {/* <!-- Metrics --> */}
      <div className="flex items-center gap-4">
        {tMetrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;
