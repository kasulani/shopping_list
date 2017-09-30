import React, {Component} from "react";
import {Link} from "react-router-dom";
import LoginForm from "../forms/LoginForm";

class HomePage extends Component{
    submit = data => {
        console.log(data);
    }
    render() {
        return(
            <div>
                <h1>Shopping List</h1>
                <LoginForm submit={this.submit}/>
                <p>Do you have an account? Please click on <Link to="/signup">signup</Link> to get a free account.</p>
            </div>
        );
    }
}

export default HomePage;