import React from 'react';
import ReactDOM from 'react-dom/client'; // Para React 18 e acima
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; 
import './App.css';
import './Paginas/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);