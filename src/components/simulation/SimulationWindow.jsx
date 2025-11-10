import { motion } from 'framer-motion';
import { Play, Pause, StepBack, StepForward, FastForward, Info } from 'lucide-react';
import VisualizationPanel from './VisualizationPanel';
import StepByStepDisplay from './StepByStepDisplay';
import Button from '../Button';
import Card from '../Card';


// todo: implementation of generate explanation left
const SimulationWindow = ({
  simulation,
  currentStep,
  totalSteps,
  currentStepData,
  isPlaying,
  handleTogglePlayPause,
  stepBack,
  stepForward,
  setIsJumpModalOpen,
  settings,
  handleGenerateExplanation,
  isGeneratingExplanation,
  generatedExplanation,
  setGeneratedExplanation,
}) => (
  <Card title="Step-by-Step Simulation" className="h-full">
    <div className="space-y-6">
      {/* top header button for playing and other function*/}
      <div className="flex flex-wrap gap-2 justify-center pb-4 border-b border-gray-200 dark:border-gray-700">

        <Button icon={StepBack} size="sm" onClick={stepBack} disabled={!simulation || currentStep === 0}>
          Back
        </Button>

        <Button icon={isPlaying ? Pause : Play} size="sm" onClick={handleTogglePlayPause} disabled={!simulation || currentStep === totalSteps - 1}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        <Button icon={StepForward} size="sm" onClick={stepForward} disabled={!simulation || currentStep === totalSteps - 1}>
          Forward
        </Button>

        <Button icon={FastForward} size="sm" variant="outline" onClick={() => setIsJumpModalOpen(true)} disabled={!simulation}>
          Jump to Step
        </Button>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
        <div className="flex justify-between items-center text-sm font-semibold mb-2">

          <span className="text-blue-600 dark:text-blue-400">Step: {currentStep + 1}/{totalSteps}</span>
          <span className="text-gray-600 dark:text-gray-300 ">Page: {currentStepData?.page || '-'}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${!currentStepData ? 'bg-gray-300 text-gray-800' :
            currentStepData.isHit ? 'bg-green-500 text-white' :
              'bg-red-500 text-white'
            }`}>
            {currentStepData ? (currentStepData.isHit ? 'HIT' : 'FAULT') : 'READY'}
          </span>

        </div>

        {/* status bar to show the progress of steps */}
        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep + 1) / totalSteps * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <VisualizationPanel step={currentStepData} algorithm={settings.algorithm} />

      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 flex items-center"><Info className="w-5 h-5 mr-2" /> Decision Analysis</h4>
      <StepByStepDisplay
        step={currentStepData}
        onGenerateExplanation={() => {
          if (isPlaying) {
            handleTogglePlayPause(); // pause the animation if it is  playing
          }
          handleGenerateExplanation(currentStepData, settings.algorithm, setGeneratedExplanation);
        }}
        isGeneratingExplanation={isGeneratingExplanation}
        generatedExplanation={generatedExplanation}
      />

    </div>
  </Card>
);

export default SimulationWindow;
