import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, X, Zap, MoveRight, HardDrive, ArrowRight, Layers } from 'lucide-react';

const FramesDisplay = ({ step }) => {
  const [animationPhase, setAnimationPhase] = useState('initial'); // 'initial', 'requesting', 'faulting', 'replacing', 'complete'
  const [displayFrames, setDisplayFrames] = useState([]);
  const [requestedPage, setRequestedPage] = useState(null);
  const [showMemorySource, setShowMemorySource] = useState(false);

  useEffect(() => {
    if (!step) {
      setDisplayFrames([]);
      setAnimationPhase('initial');
      return;
    }

    const { framesBefore, framesAfter, page, isHit, replacedIndex, replacedPage } = step;
    
    // Reset animation state
    setAnimationPhase('initial');
    setRequestedPage(page);
    setDisplayFrames(framesBefore || []);
    setShowMemorySource(false);

    // Store timeout IDs for cleanup
    const timeouts = [];

    // Animate page fault handling in real-time
    if (!isHit) {
      // Phase 1: Show page request
      timeouts.push(setTimeout(() => {
        setAnimationPhase('requesting');
        setShowMemorySource(true);
      }, 200));

      // Phase 2: Show page fault
      timeouts.push(setTimeout(() => {
        setAnimationPhase('faulting');
      }, 600));

      // Phase 3: Show frame replacement
      timeouts.push(setTimeout(() => {
        setAnimationPhase('replacing');
        // Show intermediate state with highlighted replacement
        if (replacedIndex !== null && replacedIndex !== undefined) {
          const intermediateFrames = [...(framesBefore || [])];
          if (replacedIndex < intermediateFrames.length) {
            // Highlight the frame being replaced
            setDisplayFrames(intermediateFrames);
          }
        }
      }, 1000));

      // Phase 4: Complete - show final state
      timeouts.push(setTimeout(() => {
        setAnimationPhase('complete');
        setDisplayFrames(framesAfter || []);
        setShowMemorySource(false);
      }, 1400));
    } else {
      // For hits, just show the final state immediately
      setAnimationPhase('complete');
      setDisplayFrames(framesAfter || []);
    }

    // Cleanup function to clear all timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [step]);

  if (!step) {
    return <div className="text-center text-gray-500 dark:text-gray-400 p-8">Run simulation to view memory frames.</div>;
  }

  const { framesAfter, page, isHit, replacedIndex, replacedPage } = step;
  const maxFrames = Math.max(
    (step.framesBefore || []).length,
    (framesAfter || []).length
  );

  // Ensure displayFrames has the correct length
  const currentFrames = [...displayFrames];
  while (currentFrames.length < maxFrames) {
    currentFrames.push(null);
  }

  const getFrameClass = (pageInFrame, index) => {
    let base = "m-3 w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center text-xl font-bold rounded-xl border-2 transition-all duration-300 relative shadow-md";
    
    if (pageInFrame === null) {
      return `${base} bg-gray-100 dark:bg-gray-700 border-dashed border-gray-400 text-gray-500 dark:text-gray-400 text-sm`;
    }

    // Animation states for page faults
    if (!isHit) {
      if (animationPhase === 'requesting' && pageInFrame === page) {
        return `${base} bg-purple-100 dark:bg-purple-900 border-purple-500 text-purple-700 dark:text-purple-300 ring-4 ring-purple-200 dark:ring-purple-800 scale-110 animate-pulse`;
      }

      if (animationPhase === 'faulting') {
        if (pageInFrame === page) {
          return `${base} bg-red-100 dark:bg-red-900 border-red-500 text-red-700 dark:text-red-300 ring-4 ring-red-200 dark:ring-red-800 scale-110 animate-pulse`;
        }
      }

      if (animationPhase === 'replacing') {
        if (index === replacedIndex && replacedPage !== null) {
          return `${base} bg-yellow-100 dark:bg-yellow-900 border-yellow-500 text-yellow-700 dark:text-yellow-300 animate-pulse scale-105`;
        }
        if (pageInFrame === page && index === replacedIndex) {
          return `${base} bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300 scale-110 ring-4 ring-blue-200 dark:ring-blue-800`;
        }
      }

      if (animationPhase === 'complete' && pageInFrame === page) {
        return `${base} bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300 scale-105`;
      }
    }

    // Hit state
    if (isHit && pageInFrame === page) {
      return `${base} bg-green-100 dark:bg-green-900 border-green-500 text-green-700 dark:text-green-300 ring-4 ring-green-200 dark:ring-green-800 scale-105`;
    }

    // Normal state
    return `${base} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100`;
  };

  const getAnimationStatus = () => {
    if (isHit) return 'Page Hit - Already in Memory';
    switch (animationPhase) {
      case 'requesting': return 'Requesting Page...';
      case 'faulting': return 'Page Fault Detected!';
      case 'replacing': return `Replacing Frame ${replacedIndex !== null ? replacedIndex + 1 : ''}...`;
      case 'complete': return 'Page Loaded Successfully';
      default: return 'Initializing...';
    }
  };

  return (
    <div className="space-y-4">
      {/* Memory Source Visualization */}
      {showMemorySource && !isHit && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700 mb-4"
        >
          <div className="flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Secondary Storage</span>
          </div>
          <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900 border-2 border-purple-500 rounded-lg"
          >
            <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">Page {requestedPage}</span>
          </motion.div>
          <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Main Memory</span>
          </div>
        </motion.div>
      )}

      {/* Animation Status */}
      <div className="text-center">
        <motion.div
          key={animationPhase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`inline-block px-4 py-2 rounded-lg font-semibold text-sm ${
            isHit
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : animationPhase === 'faulting'
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              : animationPhase === 'replacing'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
          }`}
        >
          {getAnimationStatus()}
        </motion.div>
      </div>

      {/* Frames Display */}
      <div className="flex justify-center flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[200px]">
        <AnimatePresence mode="popLayout">
          {currentFrames.map((p, index) => {
            const isReplacing = !isHit && animationPhase === 'replacing' && index === replacedIndex;
            const isNewPage = !isHit && p === page && (animationPhase === 'replacing' || animationPhase === 'complete');
            
            return (
              <motion.div
                key={`${p !== null ? p : 'empty'}-${index}-${animationPhase}`}
                className={getFrameClass(p, index)}
                initial={isNewPage ? { scale: 0, opacity: 0, y: -50 } : { scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: isReplacing ? [1, 1.1, 1] : 1,
                  opacity: 1,
                  y: 0
                }}
                exit={isReplacing && replacedPage !== null ? { 
                  scale: 0.8, 
                  opacity: 0,
                  x: -100,
                  transition: { duration: 0.4 }
                } : { scale: 0.8, opacity: 0 }}
                transition={{ 
                  duration: isNewPage ? 0.5 : 0.3,
                  type: isNewPage ? 'spring' : 'tween',
                  stiffness: isNewPage ? 200 : 100
                }}
                layout
              >
                {p === null ? (
                  <span className="text-sm">Empty</span>
                ) : (
                  <>
                    <motion.span
                      initial={isNewPage ? { rotate: 360, scale: 0 } : { y: 5, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {p}
                    </motion.span>
                    {isReplacing && replacedPage !== null && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-yellow-200 dark:bg-yellow-800 rounded-xl"
                      >
                        <span className="text-sm text-yellow-800 dark:text-yellow-200">{replacedPage}</span>
                      </motion.div>
                    )}
                  </>
                )}
                <div className="absolute -bottom-6 text-xs text-gray-500 dark:text-gray-400 font-normal">
                  Frame {index}
                </div>
                {isReplacing && replacedPage !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded"
                  >
                    Replacing
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex justify-center flex-wrap gap-4 text-xs font-medium pt-2">
        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full flex items-center">
          <Check className="w-3 h-3 mr-1" /> Hit
        </span>
        <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-full flex items-center">
          <X className="w-3 h-3 mr-1" /> Fault
        </span>
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded-full flex items-center">
          <Zap className="w-3 h-3 mr-1" /> Victim
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full flex items-center">
          <MoveRight className="w-3 h-3 mr-1" /> Current Ref
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full flex items-center">
          <HardDrive className="w-3 h-3 mr-1" /> Loading
        </span>
      </div>
    </div>
  );
};

export default FramesDisplay;
