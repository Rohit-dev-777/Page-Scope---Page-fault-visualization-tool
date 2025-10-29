import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

// Components
import MainLayout from './components/layout/MainLayout.jsx';
import SimulationPage from './pages/SimulationPage.jsx';
import HomePage from './pages/HomePage.jsx';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/simulation"
          element={
            <>
              <SignedIn>
                <SimulationPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </MainLayout>
  );
};

export default App;