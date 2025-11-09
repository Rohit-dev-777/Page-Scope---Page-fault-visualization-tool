import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

// Components
import MainLayout from './components/layout/MainLayout.jsx';
import SimulationPage from './pages/SimulationPage.jsx';
import HomePage from './pages/HomePage.jsx';

const IS_CLERK_ENABLED = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const SimulationRoute = () => {
  // In development mode (no Clerk), show simulation directly
  if (!IS_CLERK_ENABLED) {
    return <SimulationPage />;
  }

  // Production mode: Require authentication
  return (
    <>
      <SignedIn>
        <SimulationPage />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simulation" element={<SimulationRoute />} />
      </Routes>
    </MainLayout>
  );
};

export default App;