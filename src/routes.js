import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import SignupPage from './components/signup/SignupPage';
import DashBoard from './components/dashboard/DashBoard';

export default (
  <Route path="/" component={App}>
    {/*pass these as children to the App component based on the path*/}
    <IndexRoute component={HomePage}/>
    <Route path="/" component={HomePage}/>
    <Route path="signup" component={SignupPage}/>
    <Route path="dashboard" component={DashBoard}/>
  </Route>
);
