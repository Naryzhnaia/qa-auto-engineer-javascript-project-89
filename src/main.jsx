import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@hexlet/chatbot-v2/styles'
import ReactDOM from 'react-dom/client'
import Widget from '@hexlet/chatbot-v2'
import steps from '@hexlet/chatbot-v2/example-steps'
import '@hexlet/chatbot-v2/styles'
import App from './App'

const containerApp = document.getElementById('root')
ReactDOM.createRoot(containerApp)
  .render(<App />)

const containerWidget = document.getElementById('root')
ReactDOM.createRoot(containerWidget)
  .render(Widget(steps))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
