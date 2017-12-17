import 'babel-polyfill'; // to transpile features babel can't transpile from E6 to E5
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './styles/shoplist.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import store from "./store/configStore";
import {Provider} from "react-redux";

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app')
);
