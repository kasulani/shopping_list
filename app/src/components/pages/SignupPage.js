import React, {Component} from "react";
import SignupForm from "../forms/SignupForm";

class SignupPage extends Component{
    submit = data => {
        console.log(data);
    }
    render() {
        return(
            <div>
                <h1>Create an account</h1>
                <SignupForm submit={this.submit}/>
            </div>
        );
    }
}

export default SignupPage;