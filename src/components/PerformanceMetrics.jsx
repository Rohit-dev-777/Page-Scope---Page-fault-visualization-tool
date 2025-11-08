import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { X, Check, BarChart, Brain } from 'lucide-react';

import Card from './Card.jsx';
import Button from './Button.jsx';

const PerformanceMetrics = ({
  simulation,
  currentStep,
  chartRef,
  onCompareAlgorithms,
  isComparing,
}) => {
  // --- Real-time Stats ---
  const { totalFaults, totalHits } = useMemo(() => {
    if (!simulation || currentStep < 0) return { totalFaults: 0, totalHits: 0 };

    const steps = simulation.steps.slice(0, currentStep + 1);
    let totalFaults = 0;
    let totalHits = 0;

    steps.forEach((s) => {
      if (s.isFault) totalFaults++;
      else totalHits++;
    });

    return { totalFaults, totalHits };
  }, [simulation, currentStep]);

  const total = totalFaults + totalHits;
  const hitRate = total > 0 ? ((totalHits / total) * 100).toFixed(1) : 0;
  const efficiency = hitRate;

  // --- Chart Data ---
  const chartData = useMemo(() => {
    if (!simulation) return { labels: [], datasets: [] };

    const steps = simulation.steps.slice(0, currentStep + 1);
    const labels = steps.map((_, i) => i + 1);
    let cumulativeFaults = 0;
    const faultData = steps.map((s) => {
      cumulativeFaults += s.isFault ? 1 : 0;
      return cumulativeFaults;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Cumulative Page Faults',
          data: faultData,
          borderColor: '#fb923c',
          backgroundColor: 'rgba(251, 146, 60, 0.15)',
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#fb923c',
          pointHoverRadius: 6,
        },
      ],
    };
  }, [simulation, currentStep]);

  // --- Chart Options ---
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 700,
      easing: 'easeOutQuart',
    },
    layout: { padding: 20 },
    scales: {
      y: {
        beginAtZero: true,
        grace: '10%',
        title: {
          display: true,
          text: 'Cumulative Page Faults',
          color: 'rgb(229 231 235)',
          font: { size: 14 },
        },
        ticks: { color: 'rgb(229 231 235)', stepSize: 1 },
        grid: { color: 'rgba(255,255,255,0.07)' },
      },
      x: {
        title: {
          display: true,
          text: 'Step Number',
          color: 'rgb(229 231 235)',
          font: { size: 14 },
        },
        ticks: { color: 'rgb(229 231 235)' },
        grid: { color: 'rgba(255,255,255,0.07)' },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: { color: 'rgb(229 231 235)', boxWidth: 12 },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        borderColor: '#fb923c',
        borderWidth: 1,
      },
      title: {
        display: true,
        text: 'Cumulative Page Faults per Step',
        color: '#f9fafb',
        font: { size: 18, weight: 'bold' },
      },
    },
    backgroundColor: '#1e293b',
  };

  // --- Stat Card Component ---
  const StatCard = ({ label, value, icon: Icon, colorClass, borderClass }) => (
    <div
      className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border-l-4 ${borderClass} flex items-center space-x-3 transition duration-300 hover:shadow-lg`}
    >
      <Icon className={`w-7 h-7 ${colorClass}`} />
      <div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </div>
      </div>
    </div>
  );

  // --- Main Return ---
  return (
    <Card
      title="Performance Metrics"
      className="col-span-1 md:col-span-1"
      headerContent={
        <Button
          icon={Brain}
          variant="primary"
          size="sm"
          onClick={onCompareAlgorithms}
          loading={isComparing}
          disabled={!simulation || isComparing}
        >
          Compare Algorithms
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Statistics Row */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Page Faults (Total)"
            value={totalFaults}
            icon={X}
            colorClass="text-red-500"
            borderClass="border-red-500"
          />
          <StatCard
            label="Page Hits (Total)"
            value={totalHits}
            icon={Check}
            colorClass="text-green-500"
            borderClass="border-green-500"
          />
          <StatCard
            label="Overall Hit Rate"
            value={`${hitRate}%`}
            icon={BarChart}
            colorClass="text-blue-500"
            borderClass="border-blue-500"
          />
        </div>

        {/* Chart Section */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Cumulative Page Faults Visualization
          </h4>

          {/* Bigger Chart Area */}
          <div className="h-80 bg-gray-900 rounded-2xl p-5 shadow-inner">
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            The graph represents how the total number of page faults increases
            step-by-step through the reference string. The orange line shows
            growth in faults as the algorithm progresses.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceMetrics;
