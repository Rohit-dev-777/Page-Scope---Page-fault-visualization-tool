import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const IS_CLERK_ENABLED = !!PUBLISHABLE_KEY

// Warn if Clerk key is missing (but allow app to run in development)
if (!PUBLISHABLE_KEY) {
  console.warn('⚠️ Clerk Publishable Key is missing. Running in development mode without authentication.');
}

const AppWithProviders = () => {
  if (IS_CLERK_ENABLED) {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    );
  }
  
  // Development mode: Run without Clerk authentication
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
)
