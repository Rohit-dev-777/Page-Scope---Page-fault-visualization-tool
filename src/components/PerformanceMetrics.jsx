import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { X, Check, BarChart, Layers, Brain } from 'lucide-react';

import Card from './Card.jsx';
import Button from './Button.jsx';

const PerformanceMetrics = ({ simulation, currentStep, chartRef, onCompareAlgorithms, isComparing }) => {
  const step = simulation?.steps[currentStep];

  const faults = step ? step.pageFaults : 0;
  const hits = step ? step.pageHits : 0;
  const total = faults + hits;
  const hitRate = total > 0 ? ((hits / total) * 100).toFixed(1) : 0;
  const efficiency = hitRate;

  const chartData = useMemo(() => {
    if (!simulation) {
      return { labels: [], datasets: [{ data: [] }] };
    }
    const steps = simulation.steps.slice(0, currentStep + 1);
    const labels = steps.map((_, i) => i + 1);
    const hitRates = steps.map(s => {
      const t = s.pageFaults + s.pageHits;
      return t > 0 ? ((s.pageHits / t) * 100) : 0;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Hit Rate (%)',
          data: hitRates,
          borderColor: '#06b6d4', // Tailwind cyan-500
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          borderWidth: 2,
          fill: 'origin',
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [simulation, currentStep]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + '%',
          color: 'rgb(156 163 175)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        }
      },
      x: {
        title: {
          display: true,
          text: 'Step Number',
          color: 'rgb(156 163 175)',
        },
        ticks: {
            color: 'rgb(156 163 175)',
        },
        grid: {
            color: 'rgba(156, 163, 175, 0.1)',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      title: {
        display: false,
      }
    }
  };

  const StatCard = ({ label, value, icon: Icon, colorClass, borderClass }) => (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border-l-4 ${borderClass} flex items-center space-x-3 transition duration-300 hover:shadow-lg`}>
      <Icon className={`w-7 h-7 ${colorClass}`} />
      <div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      </div>
    </div>
  );

  return (
    <Card title="Performance Metrics" className="col-span-1 md:col-span-1" 
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
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Page Faults" value={faults} icon={X} colorClass="text-red-500" borderClass="border-red-500" />
          <StatCard label="Page Hits" value={hits} icon={Check} colorClass="text-green-500" borderClass="border-green-500" />
          <StatCard label="Hit Ratio" value={`${hitRate}%`} icon={BarChart} colorClass="text-cyan-500" borderClass="border-cyan-500" />
          <StatCard label="Efficiency" value={`${efficiency}%`} icon={Layers} colorClass="text-indigo-500" borderClass="border-indigo-500" />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Hit Rate Over Time</h4>
          <div className="h-48">
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceMetrics;