import { motion } from 'framer-motion';
import { Check, X, Info, Lightbulb } from 'lucide-react';
import Button from '../Button.jsx';

const StepByStepDisplay = ({ step, onGenerateExplanation, isGeneratingExplanation, generatedExplanation }) => {
  const defaultContent = (
    <div className="space-y-2">
      <div className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center"><Info className="w-6 h-6 mr-2 text-cyan-600" /> Getting Started</div>
      <p className="text-gray-600 dark:text-gray-400">Select an algorithm and click "Start Simulation" to begin detailed step-by-step analysis.</p>
    </div>
  );

  if (!step) return <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-l-4 border-cyan-600">{defaultContent}</div>;

  const { explanation, decisionReason, isHit, framesBefore, framesAfter } = step;

  const isFault = !isHit;
  const statusClass = isHit ? "bg-green-100 dark:bg-green-900 border-green-600" : "bg-red-100 dark:bg-red-900 border-red-600";
  const titleClass = isHit ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300";
  const Icon = isHit ? Check : X;

  return (
    <motion.div
      className={`p-4 rounded-xl border-l-4 ${statusClass}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={step.stepNumber}
    >
      <div className="space-y-3">
        <h4 className={`text-xl font-bold flex items-center ${titleClass}`}>
          <Icon className="w-6 h-6 mr-2" />
          {explanation}
        </h4>
        <p className="text-gray-800 dark:text-gray-200 text-lg">
          {decisionReason}
        </p>
        
        {/*todo: AI Generated Explanation Over Here*/}
        

        {isFault && (
          <div className="text-sm p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 space-y-1">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Frame State Change:</p>
            <p className='text-lg'>
              Before: {framesBefore.map((f, i) => `F${i}:${f || 'Empty'}`).join(' | ')}
            </p>
            <p className='text-lg'>
              After: {framesAfter.map((f, i) => `F${i}:${f || 'Empty'}`).join(' | ')}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StepByStepDisplay;