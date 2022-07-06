import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Container>
      <App />
    </Container>
  </BrowserRouter>
);

