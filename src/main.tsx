import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ServicesProvider } from './contexts/ServicesContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import Login from './pages/Login.tsx'
import Route from './router/Route.tsx'
import { RouterProvider } from './router/RouterProvider.tsx'
import Register from './pages/Register.tsx'
import Testing from './pages/Testing.tsx'
import GoogleSignIn from './pages/GoogleSignIn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServicesProvider>
      <AuthProvider>
        <RouterProvider base={"http://localhost:5173"}>
          <Route path={"/"} element={<App />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/tests"} element={<Testing />} />
          <Route path={"/google"} element={<GoogleSignIn />} />
      </RouterProvider>
      </AuthProvider>
    </ServicesProvider>
  </StrictMode>,
)
