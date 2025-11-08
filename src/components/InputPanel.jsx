import { useState } from 'react';
import { Zap, RefreshCw } from 'lucide-react';

import Card from './Card.jsx';
import Button from './Button.jsx';
import { ALGORITHM_CONFIG, EXAMPLE_CONFIG } from '../data/algorithmData.js';

const InputPanel = ({ settings, setSettings, onRun, onReset }) => {

  const { algorithm, referenceString, frameCount, speed } = settings;
  const [refStringError, setRefStringError] = useState('');
  const [frameCountError, setFrameCountError] = useState('');
  const [isRunning, setIsRunning] = useState(false);


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSettings(prev => ({ ...prev, [id]: value }));

    if (id === 'frameCount') {
      const count = parseInt(value);
      if (count < 1 || count > 8 || isNaN(count)) {
        setFrameCountError('Frame count must be between 1 and 8');
      } else {
        setFrameCountError('');
      }
    } else if (id === 'referenceString') {
      const valid = value.split(',').every(s => /^\s*\d+\s*$/.test(s.trim()));
      if (!valid && value.trim() !== '') {
        setRefStringError('Must be comma-separated integers');
      } else {
        setRefStringError('');
      }
    }
  };


  const handleRun = async () => {
    if (refStringError || frameCountError) return;
    const refArray = referenceString
      .split(',')
      .map(x => parseInt(x.trim()))
      .filter(x => !isNaN(x) && x >= 0);

    if (refArray.length === 0) {
      setRefStringError('Reference string cannot be empty.');
      return;
    }

    setIsRunning(true);

    await new Promise(resolve => setTimeout(resolve, 100));
    onRun(algorithm, refArray, parseInt(frameCount));
    setIsRunning(false);
  };

  const handleExampleSelect = (e) => {
    const key = e.target.value;
    if (key && EXAMPLE_CONFIG[key]) {
      const example = EXAMPLE_CONFIG[key];
      setSettings(prev => ({
        ...prev,
        referenceString: example.string,
        frameCount: String(example.frames),
      }));
      setRefStringError('');
      setFrameCountError('');
    }
  };

  return (
    <Card title="Simulation Settings" className="col-span-1 lg:col-span-1">
      <div className="space-y-4">

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="algorithm">Page Replacement Algorithm</label>
          <select id="algorithm" value={algorithm} onChange={handleInputChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            {Object.keys(ALGORITHM_CONFIG).map(key => (
              <option key={key} value={key}>{ALGORITHM_CONFIG[key].name}</option>
            ))}
          </select>
        </div>


        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="referenceString">Reference String (comma-separated)</label>
          <input type="text" id="referenceString" value={referenceString} onChange={handleInputChange} placeholder="e.g., 7,0,1,2,0,3,0,4,2,3,0,3,2" className={`w-full p-2 border ${refStringError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`} />
          {refStringError && <p className="text-red-500 text-xs mt-1">{refStringError}</p>}
        </div>


        <div className="form-group flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="frameCount">Frames (1-8)</label>
            <input type="number" id="frameCount" value={frameCount} onChange={handleInputChange} min="1" max="8" className={`w-full p-2 border ${frameCountError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`} />
            {frameCountError && <p className="text-red-500 text-xs mt-1">{frameCountError}</p>}
          </div>


          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="examples">Examples</label>
            <select id="examples" onChange={handleExampleSelect} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="">Select...</option>
              {Object.keys(EXAMPLE_CONFIG).map(key => (
                <option key={key} value={key}>{EXAMPLE_CONFIG[key].description}</option>
              ))}
            </select>
          </div>
        </div>


        <div className="flex space-x-2 pt-2">
          <Button icon={Zap} variant="primary" onClick={handleRun} disabled={isRunning || refStringError || frameCountError} loading={isRunning} className="flex-1">
            {isRunning ? 'Running...' : 'Start Simulation'}
          </Button>

          <Button icon={RefreshCw} variant="secondary" onClick={onReset} className="w-24">
            Reset
          </Button>
        </div>


        <div className="form-group pt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Animation Speed</label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Slow</span>
            <input
              type="range"
              id="speed"
              min="100"
              max="3000"
              value={settings.speed}
              onChange={handleInputChange}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700 accent-blue-600"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">Fast</span>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default InputPanel;