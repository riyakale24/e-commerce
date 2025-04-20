import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { FilterProvider } from './components/FilterContext'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <FilterProvider>
      <App />
    </FilterProvider>
    
  </StrictMode>
);
