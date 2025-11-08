import { Minus, Plus } from 'lucide-react';

import Card from './Card.jsx';
import { ALGORITHM_CONFIG } from '../data/algorithmData.js';

const AlgorithmSelector = ({ algorithm }) => {
  const info = ALGORITHM_CONFIG[algorithm];

  if (!info) return null;

  const FeatureList = ({ items, type }) => {
    const Icon = type === 'positive' ? Plus : Minus;
    const colorClass = type === 'positive' ? 'text-green-500' : 'text-red-500';

    return (
      <ul className="list-none p-0 m-0 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <Icon className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${colorClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card title="Algorithm Details" className="col-span-1 md:col-span-1">
      <div className="space-y-4">
        
        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400">{info.name}</h4>
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">{info.complexityBadge}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 italic">{info.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Time & Space</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">**Time:** {info.timeComplexity}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">**Space:** {info.spaceComplexity}</p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Data Structures</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">{info.dataStructures}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800/50">
            <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center"><Plus className="w-4 h-4 mr-1" /> Advantages</h5>
            <FeatureList items={info.advantages} type="positive" />
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800/50">
            <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center"><Minus className="w-4 h-4 mr-1" /> Disadvantages</h5>
            <FeatureList items={info.disadvantages} type="negative" />
          </div>
        </div>
        
        <div className="pt-2">
            <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Real-World Usage</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">{info.realWorldUse}</p>
        </div>
      </div>
    </Card>
  );
};

export default AlgorithmSelector;