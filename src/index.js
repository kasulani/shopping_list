import 'babel-polyfill'; // to transpile features babel can't transpile from E6 to E5
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import routes from './routes';
import './styles/shoplist.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
  <Router routes={routes}/>, document.getElementById('app')
);
