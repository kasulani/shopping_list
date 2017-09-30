import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SignupPage from "./components/pages/SignupPage";

const App = () => (
    <div className="ui container">
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" exact component={SignupPage} />
    </div>
);

export default App;
