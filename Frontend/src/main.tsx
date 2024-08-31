import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ReactQueryProvider from './services/provider/ReactQueryProvider.tsx'
import { AppContextProvider } from './context/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AppContextProvider>
    </ReactQueryProvider>
  </StrictMode>,
)
