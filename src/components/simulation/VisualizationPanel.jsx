import FramesDisplay from './FramesDisplay.jsx';
import { Layers } from 'lucide-react';

const VisualizationPanel = ({ step }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 flex items-center">
        <Layers className="w-5 h-5 mr-2" /> Memory Frames
      </h4>
      <FramesDisplay step={step} />
    </div>
  );
};

export default VisualizationPanel;
