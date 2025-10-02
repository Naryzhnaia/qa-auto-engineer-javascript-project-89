import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@hexlet/chatbot-v2/styles'
//import './index.css'
//import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import Widget from '@hexlet/chatbot-v2';
import steps from '@hexlet/chatbot-v2/example-steps';
import '@hexlet/chatbot-v2/styles';

const container = document.getElementById('root');
ReactDOM.createRoot(container)
  .render(Widget(steps));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
