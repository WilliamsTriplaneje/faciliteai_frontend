import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import './assets/scss/argon-dashboard-react.scss'
import "./assets/plugins/nucleo/css/nucleo.css";
// import "./@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

// import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

