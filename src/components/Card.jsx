import { motion } from 'framer-motion';

const Card = ({ title, children, className = '', headerContent }) => (
  <motion.div
    className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 20 }}
    transition={{ duration: 0.9 }}
  >
    {title && (
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {headerContent}
      </div>
    )}
    <div className="p-5">{children}</div>
  </motion.div>
);

export default Card;