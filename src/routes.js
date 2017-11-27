import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import SignupPage from './components/signup/SignupPage';
import DashBoard from './components/dashboard/DashBoard';
import LoggedInContainer from './components/loggedIn';
import AddList from './components/list/AddList';
import AddItem from './components/list/AddItem';
import EditList from './components/list/EditList';
import EditItem from './components/list/EditItem';
import EditProfile from './components/profile/EditProfile';
import ResetPassword from './components/profile/ResetPassword';
import ViewItems from './components/list/ViewItems';
import Error404 from './components/common/NotFound';
import LogOut from './components/common/LogOut';

export default (
  <Route path="/" component={App}>
    {/*pass these as children to the App component based on the path*/}
    <IndexRoute component={HomePage}/>
    <Route path="/" component={HomePage}/>
    <Route path="/signup" component={SignupPage}/>
    <Route component={LoggedInContainer}>
      <Route path="dashboard" component={DashBoard}/>
      <Route path="logout" component={LogOut}/>
      <Route path="reset-password" component={ResetPassword}/>
      <Route path="lists/new" component={AddList}/>
      <Route path="edit/profile" component={EditProfile}/>
      <Route path="edit/lists/:id" component={EditList}/>
      <Route path="add/items/:id" component={AddItem}/>
      <Route path="view/items/:id" component={ViewItems}/>
      <Route path="edit/lists/:listId/items/:itemId" component={EditItem}/>
      <Route path="error/404" component={Error404}/>
    </Route>
  </Route>
);
