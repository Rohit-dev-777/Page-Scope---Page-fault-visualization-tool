import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain } from 'lucide-react';

import Button from './Button.jsx';

const AiResponseModal = ({ isOpen, onClose, title, content }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 flex items-center"><Brain className="w-6 h-6 mr-2" />{title}</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-5 text-gray-800 dark:text-gray-200 space-y-4 prose prose-blue dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
);

export default AiResponseModal;