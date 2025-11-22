import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, App as AntApp } from 'antd'
import App from './App'
import { ResumeProvider } from './context/ResumeContext'
import { TipsProvider, TipPopover } from './components/tips/TipsProvider'
import './index.css'

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: '#0ea5e9',
    borderRadius: 8,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Select: {
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
    },
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <AntApp>
        <ResumeProvider>
          <TipsProvider>
            <App />
            <TipPopover />
          </TipsProvider>
        </ResumeProvider>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>,
)
