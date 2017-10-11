import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';

export default (
  <Route path="/" component={App}>
    {/*pass these as children to the App component based on the path*/}
    <IndexRoute component={HomePage}/>
  </Route>
);
