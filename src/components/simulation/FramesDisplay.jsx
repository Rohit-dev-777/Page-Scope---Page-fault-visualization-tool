import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, MoveRight } from 'lucide-react';

const FramesDisplay = ({ step }) => {
  if (!step) return <div className="text-center text-gray-500 dark:text-gray-400 p-8">Run simulation to view memory frames.</div>;

  const { framesAfter, page, isHit, replacedIndex, replacedPage } = step;

  const getFrameClass = (pageInFrame, index) => {
    let base = "m-3 w-16 h-16 sm:w-25 sm:h-25 flex flex-col items-center justify-center text-xl font-bold rounded-xl border-2 transition-all duration-300 relative shadow-md";
    if (pageInFrame === null) {
      return `${base} bg-gray-100 dark:bg-gray-700 border-dashed border-gray-400 text-gray-500 dark:text-gray-400 text-sm`;
    }

    if (isHit && pageInFrame === page) {
      return `${base} bg-green-100 dark:bg-green-900 border-green-500 text-green-700 dark:text-green-300 ring-4 ring-green-200 dark:ring-green-800 scale-105`;
    }

    if (!isHit && pageInFrame === page) {
      return `${base} bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300 scale-105`;
    }

    if (!isHit && replacedPage !== null && index === replacedIndex) {
      return `${base} bg-yellow-100 dark:bg-yellow-900 border-yellow-500 text-yellow-700 dark:text-yellow-300 animate-pulse`;
    }

    return `${base} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <AnimatePresence>
          {framesAfter.map((p, index) => (
            <motion.div
              key={p !== null ? p : `empty-${index}`}
              className={getFrameClass(p, index)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {p === null ? 'Empty' : (
                <>
                  <motion.span
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {p}
                  </motion.span>
                  <div className="absolute -bottom-6 text-xs text-gray-500 dark:text-gray-400 font-normal">Frame {index}</div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-center flex-wrap gap-4 text-xs font-medium pt-2">
        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full flex items-center"><Check className="w-3 h-3 mr-1" /> Hit</span>
        <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-full flex items-center"><X className="w-3 h-3 mr-1" /> Fault</span>
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded-full flex items-center"><Zap className="w-3 h-3 mr-1" /> Victim</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full flex items-center"><MoveRight className="w-3 h-3 mr-1" /> Current Ref</span>
      </div>
    </div>
  );
};

export default FramesDisplay;
