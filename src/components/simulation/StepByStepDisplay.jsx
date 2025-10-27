import { motion } from 'framer-motion';
import { Check, X, Info, Lightbulb } from 'lucide-react';
import Button from '../Button.jsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
          <Button
            icon={Lightbulb}
            variant="outline"
            size="sm"
            onClick={onGenerateExplanation}
            loading={isGeneratingExplanation}
            disabled={isGeneratingExplanation}
          >
            ✨ Explain This Step Conceptually
          </Button>
          {generatedExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-3 p-3 bg-cyan-50 dark:bg-cyan-900/50 border border-cyan-200 dark:border-cyan-800/50 rounded-lg text-sm text-gray-800 dark:text-gray-100"
            >
              <p className="font-bold text-cyan-800 dark:text-cyan-200 mb-2">AI Conceptual Insight:</p>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => <p className="mb-2 text-gray-800 dark:text-gray-200" {...props} />,
                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-gray-100" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                    li: ({ node, ...props }) => <li className="text-gray-800 dark:text-gray-200" {...props} />,
                    code: ({ node, inline, ...props }) => (
                      inline
                        ? <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm" {...props} />
                        : <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm my-2" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-cyan-500 pl-4 italic my-2" {...props} />
                    ),
                  }}
                >
                  {generatedExplanation}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </div>

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