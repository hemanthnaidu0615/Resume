import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ResumeProvider } from './context/ResumeContext'
import { TipsProvider, TipPopover } from './components/tips/TipsProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResumeProvider>
      <TipsProvider>
        <App />
        <TipPopover />
      </TipsProvider>
    </ResumeProvider>
  </React.StrictMode>,
)
