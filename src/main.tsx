import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ServicesProvider } from './contexts/ServicesContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServicesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ServicesProvider>
  </StrictMode>,
)
