import React,{ StrictMode } from 'react'
import ReactDOM,{ createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
  );

