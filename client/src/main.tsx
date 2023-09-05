import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LibraryDataContextProvider } from './contexts/LibraryDataContext.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <LibraryDataContextProvider>
        <App />
      </LibraryDataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
