import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Productstate from './context/Productstate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Productstate>
      <App />
    </Productstate>
  </React.StrictMode>
);
