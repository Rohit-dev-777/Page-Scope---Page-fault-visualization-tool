import Navigation from './Navigation';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter">
    <Navigation />
    {children}
  </div>
);

export default MainLayout;
