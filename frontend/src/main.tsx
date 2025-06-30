import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import AuthProvider from './contexts/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
      <Toaster expand={true} position='top-center' richColors={true} visibleToasts={2}/>
    </BrowserRouter>
  </StrictMode>
)
