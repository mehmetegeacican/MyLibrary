import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LibraryDataContextProvider } from './contexts/LibraryDataContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LibraryDataContextProvider>
      <App />
    </LibraryDataContextProvider>
  </React.StrictMode>,
)
