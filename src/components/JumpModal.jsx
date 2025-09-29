import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import Button from './Button.jsx';

const JumpModal = ({ isOpen, onClose, maxStep, onJump }) => {
  const [targetStep, setTargetStep] = useState(1);
  useEffect(() => {
    if (isOpen && maxStep) setTargetStep(Math.min(1, maxStep));
  }, [isOpen, maxStep]);

  const handleConfirm = () => {
    const step = parseInt(targetStep);
    if (step >= 1 && step <= maxStep) {
      onJump(step - 1); // Converting  1-based step to 0-based index
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Jump to Step</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="jump-input">Step Number (1 - {maxStep})</label>
              <input
                id="jump-input"
                type="number"
                min="1"
                max={maxStep}
                value={targetStep}
                onChange={(e) => setTargetStep(Math.min(maxStep, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={handleConfirm} disabled={targetStep < 1 || targetStep > maxStep}>Jump</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JumpModal;