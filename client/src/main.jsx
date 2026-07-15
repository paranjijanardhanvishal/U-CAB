import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { RideProvider } from './context/RideContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'leaflet/dist/leaflet.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <RideProvider>
          <BrowserRouter>
            <App />
            <ToastContainer position="top-right" autoClose={3000} />
          </BrowserRouter>
        </RideProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>,
);
